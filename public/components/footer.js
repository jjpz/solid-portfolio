const footer = `
<footer class="site-footer" role="contentinfo">
    <nav class="site-nav" role="navigation">
        <ul class="menu footer-menu">
            <li class="menu-item">
                <a class="menu-item-link" href="solid-pro-services">
                    <span class="menu-item-text">Solid Pro Services</span>
                    <span class="menu-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21"><polygon points="12.503 15.948 18.364 10.502 12.502 5.053 15.44 2.322 15.439 2.321 15.44 2.321 24.237 10.502 15.442 18.679 15.439 18.679 12.503 15.948" fill="#ef3c70"/><polygon points="0.763 15.948 6.624 10.502 0.763 5.053 3.7 2.322 3.699 2.321 3.7 2.321 12.498 10.502 3.703 18.679 3.699 18.679 0.763 15.948" fill="#ef3c70"/></svg></span>
                </a>
            </li>
            <li class="menu-item">
                <a class="menu-item-link" href="custom-websites">
                    <span class="menu-item-text">Custom Websites</span>
                    <span class="menu-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21"><polygon points="12.503 15.948 18.364 10.502 12.502 5.053 15.44 2.322 15.439 2.321 15.44 2.321 24.237 10.502 15.442 18.679 15.439 18.679 12.503 15.948" fill="#ef3c70"/><polygon points="0.763 15.948 6.624 10.502 0.763 5.053 3.7 2.322 3.699 2.321 3.7 2.321 12.498 10.502 3.703 18.679 3.699 18.679 0.763 15.948" fill="#ef3c70"/></svg></span>
                </a>
            </li>
            <li class="menu-item">
                <a class="menu-item-link" href="hosting">
                    <span class="menu-item-text">Web Hosting</span>
                    <span class="menu-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21"><polygon points="12.503 15.948 18.364 10.502 12.502 5.053 15.44 2.322 15.439 2.321 15.44 2.321 24.237 10.502 15.442 18.679 15.439 18.679 12.503 15.948" fill="#ef3c70"/><polygon points="0.763 15.948 6.624 10.502 0.763 5.053 3.7 2.322 3.699 2.321 3.7 2.321 12.498 10.502 3.703 18.679 3.699 18.679 0.763 15.948" fill="#ef3c70"/></svg></span>
                </a>
            </li>
        </ul>
    </nav>
    <a class="button button-white" href="mailto:hello@solidmiami.com" target="_blank">Email Us</a>
</footer>
`;

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer;

class Footer extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		// const shadowRoot = this.attachShadow({ mode: 'closed' });
		// shadowRoot.appendChild(footerTemplate.content);
        this.innerHTML = footer;
	}
}

customElements.define('site-footer', Footer);
