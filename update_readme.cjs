const fs = require('fs');
let readme = fs.readFileSync('README.md', 'utf8');

const deploySection = `

## Deploying the Backend
1. Go to [vercel.com](https://vercel.com/) and create a new project from this repository.
2. **Important**: Set the **Root Directory** to \`backend\` during setup.
3. Add your \`GEMINI_API_KEY\` to the Environment Variables.
4. Once deployed, copy the Vercel URL and update \`VITE_API_URL\` in your frontend \`.env\` file.
`;

if(!readme.includes('Deploying the Backend')) {
  fs.appendFileSync('README.md', deploySection);
  console.log('README updated');
}
