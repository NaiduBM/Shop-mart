# Shop-mart

Shop-mart is an e-commerce web application built with TypeScript and JavaScript. It provides a platform for users to browse and purchase products online.

## Features

- User authentication and authorization
- Product browsing and searching
- Shopping cart and checkout
- Order history and tracking
- Admin panel for product management

## Tech Stack

- **Frontend:** TypeScript, JavaScript, HTML, CSS
- **Backend:** Node.js, Express.js (if applicable)
- **Database:** MongoDB (if applicable)
- **Deployment:** GitHub Pages (or specify your deployment platform)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NaiduBM/Shop-mart.git
   cd Shop-mart
   ```

1.**Install dependencies:**
```bash
npm install
```
2.**Build the project:**
```bash
npm run build
```
3.**Run the project:**
```bash
npm start
```
4.**Open the app in your browser:**
  ```bash
http://localhost:3000
```
## Deployment
The project can be deployed to GitHub Pages. Follow these steps to deploy:

1.**Create a GitHub Actions workflow file:**

Create a file at .github/workflows/deploy.yml with the following content:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Build the project
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```
2.**Enable GitHub Pages:**

Go to your repository settings.
Under "Pages", select the branch you want to deploy (e.g., main) and the folder (e.g., /root or /docs).

## Contributing
Contributions are welcome! Please follow these guidelines:

1.Fork the repository.
2.Create a new branch (git checkout -b feature/your-feature-name).
3,Make your changes.
4.Commit your changes (git commit -m 'Add some feature').
5.Push to the branch (git push origin feature/your-feature-name).
6.Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
