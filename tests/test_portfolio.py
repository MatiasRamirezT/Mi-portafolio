import json
import sqlite3
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
CASE = ROOT / "casos" / "neurolearn"


class PortfolioHTML(HTMLParser):
    def __init__(self):
        super().__init__()
        self.keys = set()
        self.paths = []
        self.ids = set()
        self.rows = {}
        self.row = None
        self.cell = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        if "data-i18n" in attrs:
            self.keys.add(attrs["data-i18n"])
        for attribute in ("href", "src"):
            if attribute in attrs:
                self.paths.append(attrs[attribute])
        if tag == "tr":
            self.row = attrs.get("data-competencia")
            if self.row:
                self.rows[self.row] = []
        if self.row and tag in ("th", "td"):
            self.cell = []

    def handle_data(self, text):
        if self.cell is not None:
            self.cell.append(text)

    def handle_endtag(self, tag):
        if tag in ("th", "td") and self.cell is not None:
            self.rows[self.row].append("".join(self.cell).strip())
            self.cell = None
        if tag == "tr":
            self.row = None


class PortfolioTests(unittest.TestCase):
    def setUp(self):
        self.page = PortfolioHTML()
        self.page.feed((ROOT / "index.html").read_text(encoding="utf-8"))
        self.db = sqlite3.connect(":memory:")
        self.addCleanup(self.db.close)
        self.db.executescript((CASE / "muestra.sql").read_text(encoding="utf-8"))
        self.query = (CASE / "consulta.sql").read_text(encoding="utf-8")

    def test_report_matches_query(self):
        rows = self.db.execute(self.query).fetchall()
        self.assertEqual([r[0] for r in rows], list(self.page.rows))
        self.assertEqual((sum(r[2] for r in rows), sum(r[3] for r in rows)), (80, 20))
        for key, name, attempts, errors, rate in rows:
            cells = self.page.rows[key]
            self.assertEqual(cells[:3], [name, str(attempts), str(errors)])
            self.assertEqual(float(cells[3].rstrip(" %").replace(",", ".")), rate)

    def test_subject_without_answers(self):
        self.db.execute("INSERT INTO competencias VALUES ('test', 'Sin intentos')")
        rows = {r[0]: r[2:] for r in self.db.execute(self.query)}
        self.assertEqual(rows["test"], (0, 0, None))

    def test_language_keys_and_local_links(self):
        dictionary = (ROOT / "assets/js/i18n-en.js").read_text(encoding="utf-8")
        translations = json.loads(dictionary.split(" = ", 1)[1].strip().rstrip(";"))
        self.assertEqual(self.page.keys, set(translations))
        for link in self.page.paths:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                continue
            if url.path:
                self.assertTrue((ROOT / unquote(url.path)).is_file(), link)
            elif url.fragment:
                self.assertIn(url.fragment, self.page.ids)
