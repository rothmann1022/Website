# DesignedByNicole-Website
A website designed by Charles Russo for Nicole Rothman's interior design business.

## Local Development

### Running the Local Server

```bash
node server.js
# or
npm start
```

Server will run at `http://localhost:3000`

### Testing the 404 Page on Localhost

Once your server is running, test the 404 page by visiting a non-existent URL:
- `http://localhost:3000/nonexistent-page`

You should see the custom 404 page instead of a generic error message.

## GitHub Pages Deployment

The site is fully configured for GitHub Pages deployment:

1. **404 Page**: The `404.html` file will automatically be served for any 404 errors
2. **Jekyll Disabled**: The `.nojekyll` file prevents Jekyll from processing the site
3. **Relative Paths**: All links use relative paths that work correctly on GitHub Pages

### To Deploy to GitHub Pages:

1. Push your code to a GitHub repository
2. Go to **Settings** → **Pages** in your repository
3. Select the branch you want to deploy (usually `main` or `master`)
4. Select the root folder (`/`)
5. Click **Save**

Your site will be available at:
- `https://username.github.io/repository-name/` (for project pages)
- `https://username.github.io/` (for user/organization pages)

**Note**: The 404 page will automatically work for any non-existent URLs on your GitHub Pages site.

## Custom 404 Page

The site includes a custom 404 error page (`404.html`) that matches the site's design and branding. It will automatically be served when:
- A non-existent URL is accessed
- A file or directory doesn't exist
- Any 404 error occurs

The 404 page includes navigation options to return to the homepage or view the portfolio.