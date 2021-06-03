import icon from './icon.svg'

miro.onReady((): void => {
  miro.initialize({
    extensionPoints: {
      toolbar: {
        title: 'miro-app-oauth',
        toolbarSvgIcon: icon,
        librarySvgIcon: icon,
        async onClick(): Promise<void> {
          // Remember that 'app.html' resolves relative to index.js file. So app.html have to be in the /dist/ folder.
          await miro.board.ui.openLibrary('/webapp-sdk1/app.html', {title: 'My React Plugin'})
        },
      },
    },
  })
})
