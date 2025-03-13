# Inventory Backend
## How to Run the Project Locally

### Steps

1. **Clone or Pull the Project**
   - If you're not a contributor yet, clone the repository using:
     ```bash
     git clone <repository-url>
     ```
   - If you're a contributor, pull the latest changes:
     ```bash
     git pull origin main
     ```

2. **Install Dependencies**
   - Open your terminal in the project's base directory and run:
     ```bash
     npm install
     ```

3. **Create the `.env` File**
   - In the base directory, create a `.env` file.
   - Copy and paste the required environment variables (found in project documentation or from the maintainer).

---

## Project Structure

```mermaid
flowchart TB
    root --> index.js
    root --> package.json
    root --> package-lock.json
    root --> product.controller.js
    root --> product.schema.js
    root --> .env
    root --> .gitignore
    root --> README.md
    root --> requests.rest
    root --> node_modules[📁 node_modules]
