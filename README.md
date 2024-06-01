<img align='right' src="https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg" width="150">

## ElectronCord

ElectronCord is a tool that could be utilized as a [Discord](https://discord.com) bot management application. The tool allows you to perform actions on your server, edit/delete/create many stuff with your bot. The tool is an `Electron Application` hosted on an `Express Server` and the UI is rendered with `ejs`. Since the
project is in a consistent development, many errors might occur. As also being in a consistent development, it creates a nice atmosphere for Feature Requests'. If you are interested in helping/contributing, you are more than welcome! 


### Local Hosting

- You should have NodeJS & NPM installed.
- Download the code.
- Open `config.json` in the main directory and set `DISCORD_TOKEN` with a value of your token.
- So `config.json` should look like:
```json
{
    "DISCORD_TOKEN": "<your_token_goes_here>"
}
```
- Run `start.bat`

Here you go! You should have ElectronCord running perferctly. Note that app listens on `PORT 3000` so don't keep this port busy (:

### Linting

Linting is made with [ESLint](https://eslint.org/) so as a reference for future PR's, please obey ESLint rules in this repistory.

