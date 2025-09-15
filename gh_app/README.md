# Forge

This project contains a Forge app written in Javascript for Jira admin page following requirements from here https://softserveinc-my.sharepoint.com/:w:/r/personal/mkotii_softserveinc_com/_layouts/15/Doc.aspx?sourcedoc=%7BCF0D0C55-04FD-4804-9B82-9AFB92DE97AB%7D&file=Forge%20Migration%20-%20Native%20Platforms%202.docx&fromShare=true&action=default&mobileredirect=true. 

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

- Modify your app frontend by editing the `src/frontend/index.jsx` file.

- Modify your app backend by editing the `src/resolvers/index.js` file to define resolver functions. See [Forge resolvers](https://developer.atlassian.com/platform/forge/runtime-reference/custom-ui-resolver/) for documentation on resolver functions.

- Build and deploy your app by running:
```
forge deploy
```

- Install your app in an Atlassian site by running:
```
forge install
```

- Develop your app by running `forge tunnel` to proxy invocations locally:
```
forge tunnel
```

### Notes
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

