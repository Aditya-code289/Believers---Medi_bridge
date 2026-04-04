# Medi_Bridge: The Semantic Interoperability Layer for Global Healthcare

**Bridging the Gap between Traditional AYUSH (NAMASTE) and Global Standards (ICD-11).**

---

## 📌 Overview
Medi_Bridge is a deterministic middleware platform designed to solve the **"Semantic Silo"** in Indian healthcare. Currently, medical records using the Ministry of AYUSH **NAMASTE** codes are isolated from the World Health Organization’s **ICD-11** standards. This disconnect leads to insurance claim rejections, research invisibility, and patient safety risks.

**Medi_Bridge provides the "Digital Passport" for traditional medicine, making it globally readable, billable, and verifiable.**

---

## 🚀 Key Features
* **Deterministic Mapping Engine:** A high-speed API that translates NAMASTE codes to ICD-11 equivalents with 100% clinical accuracy (Non-Probabilistic).
* **Knowledge Graph Integration:** Powered by **Neo4j**, mapping complex medical relationships between symptoms, traditional diagnoses, and global clinical standards.
* **Smart QR Prescription:** Generates an interoperable QR code on physical prescriptions, allowing any modern hospital to "unlock" traditional medical history instantly without complex software integration.
* **Zero-Friction Integration:** Designed to work with existing EMRs via a **Chrome Extension** overlay or direct REST API integration.
* **ABDM Aligned:** Built to facilitate the exchange of health records within the Ayushman Bharat Digital Mission (ABDM) framework by making traditional data "understandable" to modern systems.

---

## 🛠️ Tech Stack
| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js (Vite), Tailwind CSS |
| **Backend** | FastAPI (Python) |
| **Database** | Neo4j (Graph Database), AuraDB |
| **Infrastructure** | Vercel (Frontend), Render (Backend) |

---

## 🏥 The Problem vs. The Solution

### **The Problem**
1.  **Insurance Parity Gap:** Despite the 2024 IRDAI mandate for AYUSH-Allopathy parity, administrative systems lack a shared coding language, leading to frequent claim stalls.
2.  **Duplicate Testing:** Patients undergo redundant diagnostic tests because modern hospitals cannot "read" or trust traditional medical records that aren't mapped to global codes.
3.  **Invisible Research:** Indian clinical successes in AYUSH are not easily indexed in global research databases due to the lack of ICD-11 coding.

### **The Medi_Bridge Solution**
Medi_Bridge acts as a **Middleware Translator**. By automating the **WHO-recommended Dual-Coding strategy**, we ensure that every diagnosis is recorded in both its native traditional code and its global clinical equivalent, enabling automated safety checks and seamless data discovery.

---

## 📂 Project Structure
```text
├── frontend/          # React + Vite application
├── backend/           # FastAPI server with Neo4j logic
├── knowledge_graph/   # Cypher scripts for mapping NAMASTE to ICD-11
├── extension/         # Chrome Extension for EMR integration
└── docs/              # System Architecture & Documentation
