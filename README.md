

📄 NCBA Digital Document Checklist (DCL) System

A workflow management system for NCBA Credit Operations

📌 Overview

The Digital Document Checklist (DCL) system streamlines NCBA’s credit operations by digitizing the process of creating, submitting, reviewing, and approving loan application documents.

The platform provides an efficient workflow among three roles:

Credit Operations (Creator)

Relationship Manager (RM)

Credit Operations (Checker)

This system ensures improved compliance, transparency, and operational efficiency.

🚀 Features
🔹 Document Workflow Automation

Create and manage loan document checklists

Upload and validate required documents

Review, approve, or reject documents

Route workflows between RM, Creator, and Checker

🔹 Role-Based User Access

Different dashboards and permissions for each role

🔹 Audit Trail & Status Tracking

Track each step of the workflow

Full visibility on approvals, rejections, and deferments

🔹 Modern Frontend Stack

Built with:

⚛ React.js

🎨 Tailwind CSS

⚡ Vite

🔐 Potential authentication integration

🧩 Workflow Summary
🟦 1. Credit Operations (Creator)

Creates a new Document Checklist using createDCL.jsx, lists required documents, and assigns it to a Relationship Manager.

🟨 2. Relationship Manager (RM)

Uploads required documents, requests deferment if needed, and submits the checklist back for review.

🟦 3. Credit Operations (Creator) – Review Stage

Approves or rejects the RM's uploaded documents.
If rejected → sent back to RM.
If approved → sent to Checker.

🟩 4. Credit Operations (Checker) – Final Approval

Performs final validation and marks the workflow as Completed.
