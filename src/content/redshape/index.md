---
title: Redshape
thumbnail: ./redshape1.png
marker: "#F78888"
repository: https://github.com/Spring3/redshape
description:
  - { text: "Although I stopped working on it as we stopped using Redmine, it is being used by several people, who discovered it though the internet." }
  - { text: "I might invest some time into improving it a bit and adding new changes. But no promises as I don't feel motivated to get back to it most of the time." }
  - { href: https://github.com/Spring3/redshape/releases/, text: Download the latest release }
technologies:
  - Javascript
  - Electron
  - React
  - Redux
  - Node.js
  - Formik
  - Styled Components
  - Webpack
decorations:
  back:
    props:
      height: calc(100% - 150vh - 100vh)
      top: 150vh
    squares:
      - { radius: 10px, top: 50%, left: 98%, size: 15px, background: "#FFAE5A", sticky: true }
      - { radius: 10px, top: 15%, left: 80%, size: 20px, background: "#EDE8E2", sticky: true }
      - { radius: 10px, top: 43%, left: 3%, size: 25px, background: "#F2DBB5", sticky: true }
      - { radius: 10px, top: 7%, left: 75%, size: 35px, background: "#BED5AE", sticky: true }
      - { radius: 10px, top: 70%, left: 50%, size: 35px, background: "#EDE8E2", sticky: true }
      - { radius: 10px, top: 5%, left: 15%, size: 35px, background: "#F5C6AA", sticky: true }
      - { radius: 10px, top: 68%, left: 29%, size: 35px, background: "#FFA9AA", sticky: true }
    circles:
      - { top: 60%, left: 95%, size: 355px, background: "#EDE8E2", sticky: true }
  base:
    props:
      height: calc(100% - 200vh - 50vh)
      top: 200vh
    squares:
      - { dummy: true }
    circles:
      - { radius: "90% 50% 50% 90% / 60% 60% 60% 60%", top: 1%, left: 30%, size: 155px, background: "#ADDCCA", sticky: true }
      - { radius: "50% 80% 90% 50% / 60% 60% 60% 60%", top: 75%, left: 0%, size: 235px, background: "#D0DBCF", sticky: true }

images:
  - ./redshape2.png
  - ./redshape1.png
  - ./redshape3.png
---

In one of the companies I worked at, we used Redmine for time tracking. I hated the outdated design and the complexity behind certain features, so I decided to create my own app that would do just exactly what I needed and nore more, no less.

Electron is the base for this app. The main features here are:
- a list of assigned tickets
- being able to track time spent on a ticket
- post and see comments on those tickets.
