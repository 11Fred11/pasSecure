<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]](https://github.com/10Fred10/pasSecure/graphs/contributors)
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Gmail][gmail-shield]][gmail-url]
[![Behance][behance-shield]][behance-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/10Fred10/pasSecure">
    <img src="https://raw.githubusercontent.com/10Fred10/pasSecure/master/readme-assets/logo-128.png" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">PASSECURE V 1.0</h3>

  <p align="center">
    Handy chrome extension to help you choose a secure password!
    <br />
    <a href="https://chrome.google.com/webstore/detail/passecure/nocglfdggmhlenglfbbaobfdcckcghdp" target="_blank"><strong>« DOWNLOAD »</strong></a>
    <br />
    <br />
    <a href="https://www.behance.net/gallery/81385307/PASSECURE-Chrome-Extension" target="_blank">Design</a>
    ·
    <a href="https://github.com/10Fred10/pasSecure/issues" target="_blank">Report Bug</a>
    ·
    <a href="https://github.com/10Fred10/pasSecure/pulls" target="_blank">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

<p align="center">
  <a href="https://www.behance.net/gallery/81385307/PASSECURE-Chrome-Extension">
    <img  src="https://raw.githubusercontent.com/10Fred10/pasSecure/master/readme-assets/passecure-medium.png" alt="Logo">
  </a>
</p>
<br>

Passecure is a fun project i made to quickly judge the strength of a new potential password on the spot, without leaving the sign-up page, and sometimes i test random stuff.

- Passecure let's you know how many times a particular password has been pwned/hacked.
- Estimates how long does it take for a hacker to crack your password.
- Provides a feedback concerning why a password is considered weak to help you make it stronger.

:bulb: **Note :**
all the processing is made locally on your machine, no data is stored or transferred on the internet except for the Pwned test which is explained in the example below.

:star: **Example :**
let's suppose you type `azerty123` your password gets hashed to `3b004ac6d8a602681f5ee3587c924855679e21d9`, to test if this password has been hacked before, Passecure sends only the first 5 characters only the first 5 characters `3b004` to [haveibeenpwned API](https://haveibeenpwned.com/).
and gets a response containing all similar passwords that starts with those 5 characters , the rest of the work is done locally and gets deleted whenever you exist the extension window.

> _A list of used resources are listed in the acknowledgements._

### Built With

> No need for fancy frameworks, keeping it simple whenever i can.

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [HTML 5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
- [CSS 3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3)

<!-- GETTING STARTED -->

## Installation

1. Get the extension at [Chrome Store](https://chrome.google.com/webstore/detail/passecure/nocglfdggmhlenglfbbaobfdcckcghdp)
2. Enjoy.

![chrome-screenshot]

<!-- USAGE EXAMPLES -->

## Usage

Simply type any word or password in the input box and review the results.

<p align="center">
  <img  src="https://raw.githubusercontent.com/10Fred10/pasSecure/master/readme-assets/usage.gif">
</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See [![MIT License][license-shield]][license-url] for more information.

<!-- CONTACT -->

## Contact

[![LinkedIn][linkedin-shield]][linkedin-url] [![Gmail][gmail-shield]][gmail-url]

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- :package: [Dropbox zxcvbn](https://github.com/dropbox/zxcvbn) | Js library to test password strength.
- :earth_africa: [Haveibeenpwned](https://haveibeenpwned.com/) | API to CHeck for Hacked/Pwned passwords.
- :octocat: [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet) | Emojies
- :key: [Img Shields](https://shields.io) | Shields

<!-- MARKDOWN LINKS & IMAGES -->

[build-shield]: https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square
[contributors-shield]: https://img.shields.io/badge/contributors-1-orange.svg?style=flat-square
[license-shield]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: https://choosealicense.com/licenses/mit
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-blue.svg?style=flat-square&logo=linkedin
[linkedin-url]: https://linkedin.com/in/fredhm
[gmail-shield]: https://img.shields.io/badge/Gmail-red.svg?style=flat-square&logo=gmail&logoColor=white
[gmail-url]: mailto:contact.hammami.fredj@gmail.com
[chrome-screenshot]: https://raw.githubusercontent.com/10Fred10/pasSecure/master/readme-assets/chrome-store.png
[behance-shield]: https://img.shields.io/badge/Behance-blue.svg?style=flat-square&logo=behance&logoColor=white
[behance-url]: https://www.behance.net/gallery/81385307/PASSECURE-Chrome-Extension
