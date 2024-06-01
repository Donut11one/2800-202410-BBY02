# DocuMint Application

## Overview
DocuMint is a blockchain-based web application that allows users to manage their documents securely. The application enables users to upload, view, transfer, and burn their documents, which are stored as NFTs (Non-Fungible Tokens) on the Ethereum blockchain. The application supports user authentication via Firebase and wallet connection via MetaMask.

## Features
- **User Authentication:** Users can log in using Firebase authentication.
- **Wallet Connection:** Users can connect their Ethereum wallet via MetaMask.
- **Document Upload:** Users can upload documents, which are minted as NFTs.
- **Document Viewing:** Users can view their uploaded documents.
- **Document Transfer:** Users can transfer their document NFTs to other Ethereum addresses.
- **Document Burning:** Users can burn their document NFTs.
- **Network Support:** The application checks if the user is connected to the Sepolia network and prompts to switch if not.

## Getting Started

## Note
- Users need SepoliaETH to run the app. Ensure your MetaMask wallet is funded with SepoliaETH. You can get them via faucets like (https://sepolia-faucet.pk910.de/)

### Prerequisites
- Node.js
- npm or yarn
- MetaMask browser extension

### Installation
   ```bash
   git clone https://github.com/Donut11one/2800-202410-BBY02
   cd 2800-202410-BBY02
   npm i
   npm start
    ```
### Easter egg
The application features an Easter egg that displays a Nyan Cat animation after a certain number of clicks.


4.Listing of File Contents of folder:

C:.
│   .env
│   .gitignore
│   index.html
│   package-lock.json
│   package.json
│   postcss.config.js
│   README.md
│   tailwind.config.js
│
├───artifacts
│   └───@openzeppelin
│       └───contracts
│           ├───token
│           │   └───ERC721
│           │       ├───ERC721.sol
│           │       │       ERC721.json
│           │       │
│           │       ├───extensions
│           │       │   └───IERC721Metadata.sol
│           │       │           IERC721Metadata.dbg.json
│           │       │           IERC721Metadata.json
│           │       │
│           │       ├───IERC721.sol
│           │       │       IERC721.dbg.json
│           │       │       IERC721.json
│           │       │
│           │       └───IERC721Receiver.sol
│           │               IERC721Receiver.dbg.json
│           │               IERC721Receiver.json
│           │
│           └───utils
│               ├───Context.sol
│               │       Context.dbg.json
│               │       Context.json
│               │
│               ├───introspection
│               │   ├───ERC165.sol
│               │   │       ERC165.dbg.json
│               │   │       ERC165.json
│               │   │
│               │   └───IERC165.sol
│               │           IERC165.dbg.json
│               │           IERC165.json
│               │
│               ├───math
│               │   ├───Math.sol
│               │   │       Math.dbg.json
│               │   │       Math.json
│               │   │
│               │   └───SignedMath.sol
│               │           SignedMath.dbg.json
│               │           SignedMath.json
│               │
│               └───Strings.sol
│                       Strings.dbg.json
│                       Strings.json
│
├───Back_end
│       Contract.sol
│
├───front-end
│   │   .env
│   │
│   └───node_modules
│       │   .package-lock.json
│       │
│       ├───.bin
│       ├───.cache
│       │   │   .eslintcache
│       │   │
│       │   ├───babel-loader
│       │   │       
│       │   │
│       │   └───default-development
│       │           0.pack
│       │           1.pack
│       │           10.pack
│       │           11.pack
│       │           12.pack
│       │           2.pack
│       │           3.pack
│       │           4.pack
│       │           5.pack
│       │           6.pack
│       │           7.pack
│       │           8.pack
│       │           9.pack
│       │           index.pack
│       │           index.pack.old
│       │
│       ├───@adraffy
│       ├───@alloc
│       ├───@ampproject
│       ├───@babel
│       ├───@bcoe
│       ├───@csstools
│       ├───@esbuild
│       ├───@eslint
│       ├───@eslint-community
│       ├───@ethersproject
│       ├───@fastify
│       ├───@firebase
│       ├───@fortawesome
│       ├───@grpc
│       ├───@humanwhocodes
│       ├───@isaacs
│       ├───@istanbuljs
│       ├───@jest
│       ├───@jridgewell
│       ├───@leichtgewicht
│       ├───@nicolo-ribaudo
│       ├───@noble
│       ├───@nodelib
│       ├───@pkgjs
│       ├───@pmmmwh
│       ├───@popperjs
│       ├───@protobufjs
│       ├───@react-aria
│       ├───@remix-run
│       ├───@restart
│       ├───@rollup
│       ├───@rushstack
│       ├───@scure
│       ├───@sinclair
│       ├───@sinonjs
│       ├───@surma
│       ├───@svgr
│       ├───@swc
│       ├───@tootallnate
│       ├───@trysound
│       ├───@types
│       ├───@typescript-eslint
│       ├───@ungap
│       ├───@vitejs
│       ├───@web3-react
│       ├───@webassemblyjs
│       └───@xtuc
├───public
│       index.html
│
└───src
    │   App.css
    │   App.jsx
    │   fbconfig.js
    │   helper-hardhat-config.js
    │   index.css
    │   index.js
    │   pinFileToIPFS.js
    │   reportWebVitals.js
    │   runScript.js
    │   style.css
    │
    ├───assets
    │   │   helper-hardhat-config.js
    │   │   react.svg
    │   │
    │   └───images
    │           1-metamask-download.png
    │           2-choose-browser.png
    │           3-create-wallet.png
    │           4-complete-steps.png
    │           5-connect.png
    │           Circle-bg.jpeg
    │           DM_Circle.png
    │           DM_Circle_Small.png
    │           DocuMintApp.png
    │           DocuMintFull.png
    │           DocuMintHorizontal.png
    │           DocuMintVertical.png
    │           help1.jpg
    │           help2.jpg
    │           help3.jpg
    │           help4.jpg
    │           help5.jpg
    │           nyan-cat.gif
    │           Ozp.gif
    │           stream-bg.jpeg
    │           switch-network.png
    │           wallet-page-sample-bg.jpeg
    │
    ├───components
    │   │   Button.jsx
    │   │   Carousel.jsx
    │   │   Footer.jsx
    │   │   HeroSection.jsx
    │   │   HeroSectionVid.jsx
    │   │   Login.jsx
    │   │   MetamaskInfo.jsx
    │   │   Navbar.jsx
    │   │   PasswordReset.css
    │   │   PasswordReset.jsx
    │   │   ProtectedRoute.jsx
    │   │   SignUp.jsx
    │   │   UploadDocModal.jsx
    │   │   WalletSetupInstruction.jsx
    │   │
    │   └───pages
    │           Docs.jsx
    │           HelpPage.jsx
    │           Home.css
    │           Home.jsx
    │           Landing.css
    │           Landing.jsx
    │           NotFoundPage.jsx
    │           Profile.jsx
    │           styles.css
    │
    └───hooks
            useWallet.jsx


5.How to install or run the project?
 cd .\front-end\
 npm install

6.How to use the product?
npm start

7.Include Credits, References, and Licenses
YouTube React Tutorial: https://www.youtube.com/watch?v=LDB4uaJ87e0&t=7284s

8.How did you use AI? Tell us exactly what AI services and products you used and how you used them. Be very specific:
-We use AI-powered tool Trello, to create tasks using lists and cards, to assign tasks weekly and manage tasks effectively.
-We use cloud-based design tool Figma to work our project design, create interactive prototypes, to help us validate design ideas. 
-We use AI-driven IDEs Visual Studio Code to edit our code.

9.Contact Information
yiming168@gmail.com,
xwang324@my.bcit.ca, 
eflores25@my.bcit.ca, 
alexhe2002@hotmail.com, 
nmakarenko2004@gmail.com.

