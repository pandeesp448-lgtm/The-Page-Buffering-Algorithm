
# The Page Buffering Algorithm

Memory Management Simulation & Optimization Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Demo](https://img.shields.io/badge/demo-HTML%20UI-blue)](#demo)
[![Language: Python](https://img.shields.io/badge/language-Python%20%2B%20HTML-green)](#technologies)

A small project to explore and compare page replacement strategies (FIFO, LRU, Optimal, Clock, and Page Buffering variants). Useful for OS coursework, experimentation, and visualization.

Table of Contents
- Overview
- Features
- Demo
- Quick Start
  - Browser (HTML) demo
  - Python CLI simulator
- Algorithms Implemented
- Example Input & Output
- Sample Python Simulator
- Extending the Project
- Testing & Validation
- Project Structure (suggested)
- Contributing
- Roadmap
- License
- Authors & Acknowledgements

Overview
--------
This project simulates page buffering and replacement techniques that operating systems use to decide which pages to keep in memory. It collects statistics such as page faults, hits, and hit ratio and supports running multiple algorithms for comparison.

Features
--------
- Implements common page replacement algorithms:
  - FIFO (First-In-First-Out)
  - LRU (Least Recently Used)
  - Optimal (Belady's algorithm)
  - Clock (Second chance)
  - Page Buffering Algorithm (and variants)
- Collects metrics: page faults, hits, hit ratio, and trace of frame states
- Simple static HTML UI to show examples and outputs
- Example Python CLI for batch runs and experiments (sample included below)
- Extensible: add new algorithms, visualizations, or bulk tests

Demo
----
Open the provided `index.html` in a browser to view a simple static UI with sample input and output. The HTML serves as a demo page and a starting point for adding client-side simulation logic or visualizations.

Quick Start
-----------

Browser demo
1. Open `index.html` in any modern browser.
2. Inspect the "Sample Input" and "Output Example" blocks; extend the page or add JS to run simulations in-browser.

Python CLI simulator (recommended for experimentation)
1. Ensure you have Python 3.8+ installed.
2. Place a simulator script (e.g., `simulate.py`) in the project root.
3. Run the simulator from the command line:

Example:
