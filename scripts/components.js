/*jshint esversion: 6 */
// Components downloaded: chips,copy,form,input,notifications,popup,select,spinner,theme-toggle
const smChips = document.createElement("template"); smChips.innerHTML = '<style> *{ padding: 0; margin: 0; -webkit-box-sizing: border-box; box-sizing: border-box; }  :host{ padding: 1rem 0; max-width: 100%; } .hide{ opacity: 0; pointer-events: none; } input[type="radio"]{ display: none; } .scrolling-container{ position: relative; display: grid; grid-template-columns: min-content minmax(0,1fr) min-content; grid-template-rows: 1fr; } .sm-chips{ display: flex; position: relative; grid-area: 1/1/2/-1; gap: var(--gap, 0.5rem); overflow: auto hidden; } :host([multiline]) .sm-chips{ flex-wrap: wrap; } :host(:not([multiline])) .sm-chips{ max-width: 100%;  align-items: center; } .nav-button{ display: flex; z-index: 2; border: none; padding: 0.3rem; cursor: pointer; align-items: center; background: rgba(var(--background-color,(255,255,255)), 1); grid-row: 1; transition: opacity 0.2s; } .nav-button--left{ grid-column: 1; justify-self: start; } .nav-button--right{ grid-column: 3; justify-self: end; } .cover{ position: absolute; z-index: 1; width: 5rem; height: 100%; pointer-events: none; grid-row: 1; transition: opacity 0.2s; } .cover--left{ grid-column: 1; } .cover--right{ grid-column: 3; } .nav-button--right::before{ background-color: red; } .icon{ height: 1.2rem; width: 1.2rem; fill: rgba(var(--text-color,(17,17,17)), .8); } @media (hover: none){ ::-webkit-scrollbar { height: 0; } .nav-button{ display: none; } .sm-chips{ overflow: auto hidden; } .cover{ width: 2rem; } .cover--left{ background: linear-gradient(90deg, rgba(var(--background-color,(255,255,255)), 1), transparent); } .cover--right{ right: 0; background: linear-gradient(90deg, transparent, rgba(var(--background-color,(255,255,255)), 1)); } } @media (hover: hover){ ::-webkit-scrollbar-track { background-color: transparent !important; } ::-webkit-scrollbar { height: 0; background-color: transparent; } .sm-chips{ overflow: hidden; } .cover--left{ background: linear-gradient(90deg, rgba(var(--background-color,(255,255,255)), 1) 60%, transparent); } .cover--right{ right: 0; background: linear-gradient(90deg, transparent 0%, rgba(var(--background-color,(255,255,255)), 1) 40%); } }</style><section class="scrolling-container"> <div class="cover cover--left hide"></div> <button class="nav-button nav-button--left hide"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/></svg> </button> <section class="sm-chips" part="chips-wrapper"> <slot></slot> </section> <button class="nav-button nav-button--right hide"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg> </button> <div class="cover cover--right hide"></div></section>', customElements.define("sm-chips", class extends HTMLElement { constructor() { super(), this.attachShadow({ mode: "open" }).append(smChips.content.cloneNode(!0)), this.chipsWrapper = this.shadowRoot.querySelector(".sm-chips"), this.coverLeft = this.shadowRoot.querySelector(".cover--left"), this.coverRight = this.shadowRoot.querySelector(".cover--right"), this.navButtonLeft = this.shadowRoot.querySelector(".nav-button--left"), this.navButtonRight = this.shadowRoot.querySelector(".nav-button--right"), this.slottedOptions = void 0, this._value = void 0, this.scrollDistance = 0, this.assignedElements = [], this.scrollLeft = this.scrollLeft.bind(this), this.scrollRight = this.scrollRight.bind(this), this.fireEvent = this.fireEvent.bind(this), this.setSelectedOption = this.setSelectedOption.bind(this) } get value() { return this._value } set value(t) { this.setSelectedOption(t) } scrollLeft() { this.chipsWrapper.scrollBy({ left: -this.scrollDistance, behavior: "smooth" }) } scrollRight() { this.chipsWrapper.scrollBy({ left: this.scrollDistance, behavior: "smooth" }) } setSelectedOption(t) { this._value !== t && (this._value = t, this.assignedElements.forEach(e => { e.value == t ? (e.setAttribute("selected", "true"), e.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })) : e.removeAttribute("selected") })) } fireEvent() { this.dispatchEvent(new CustomEvent("change", { bubbles: !0, composed: !0, detail: { value: this._value } })) } connectedCallback() { this.setAttribute("role", "listbox"); const t = this.shadowRoot.querySelector("slot"); t.addEventListener("slotchange", e => { n.disconnect(), i.disconnect(), this.observeSelf.disconnect(), clearTimeout(this.slotChangeTimeout), this.slotChangeTimeout = setTimeout(() => { this.assignedElements = t.assignedElements(), this.assignedElements.forEach(t => { t.hasAttribute("selected") && "true" === t.getAttribute("selected") && (this._value = t.value) }), this.observeSelf.observe(this) }, 0) }); const e = new ResizeObserver(t => { t.forEach(t => { if (t.contentBoxSize) { const e = Array.isArray(t.contentBoxSize) ? t.contentBoxSize[0] : t.contentBoxSize; this.scrollDistance = .6 * e.inlineSize } else this.scrollDistance = .6 * t.contentRect.width }) }); e.observe(this), this.observeSelf = new IntersectionObserver((t, e) => { t.forEach(t => { t.isIntersecting && !this.hasAttribute("multiline") && this.assignedElements.length > 0 && (n.observe(this.assignedElements[0]), i.observe(this.assignedElements[this.assignedElements.length - 1]), e.unobserve(this)) }) }, { threshold: 1 }), this.chipsWrapper.addEventListener("option-clicked", t => { this._value !== t.target.value && (this.setSelectedOption(t.target.value), this.fireEvent()) }); const n = new IntersectionObserver(t => { t.forEach(t => { t.isIntersecting ? (this.navButtonLeft.classList.add("hide"), this.coverLeft.classList.add("hide")) : (this.navButtonLeft.classList.remove("hide"), this.coverLeft.classList.remove("hide")) }) }, { threshold: 1, root: this }), i = new IntersectionObserver(t => { t.forEach(t => { t.isIntersecting ? (this.navButtonRight.classList.add("hide"), this.coverRight.classList.add("hide")) : (this.navButtonRight.classList.remove("hide"), this.coverRight.classList.remove("hide")) }) }, { threshold: 1, root: this }); this.navButtonLeft.addEventListener("click", this.scrollLeft), this.navButtonRight.addEventListener("click", this.scrollRight) } disconnectedCallback() { this.navButtonLeft.removeEventListener("click", this.scrollLeft), this.navButtonRight.removeEventListener("click", this.scrollRight) } }); const smChip = document.createElement("template"); smChip.innerHTML = '<style> *{ padding: 0; margin: 0; -webkit-box-sizing: border-box; box-sizing: border-box; }  :host(:focus-within){ outline: none; } :host(:focus-within) .sm-chip{ box-shadow: 0 0 0 0.1rem var(--accent-color,teal) inset; } :host(:hover:not([selected="true"])) .sm-chip{ background-color: rgba(var(--text-color,(17,17,17)), 0.06); } .sm-chip{ display: flex; flex-shrink: 0; cursor: pointer; white-space: nowrap; padding: var(--padding, 0.5rem 0.8rem); transition: background 0.3s; border-radius: var(--border-radius, 0.5rem); -webkit-tap-highlight-color: transparent; background: var(--background,inherit); } :host([selected="true"]) .sm-chip{ background-color: var(--accent-color, teal); color: rgba(var(--background-color, (255,255,255)), 1); }</style><span class="sm-chip" part="chip"> <slot></slot></span>', customElements.define("sm-chip", class extends HTMLElement { constructor() { super(), this.attachShadow({ mode: "open" }).append(smChip.content.cloneNode(!0)), this._value = void 0, this.radioButton = this.shadowRoot.querySelector("input"), this.fireEvent = this.fireEvent.bind(this), this.handleKeyDown = this.handleKeyDown.bind(this) } get value() { return this._value } fireEvent() { this.dispatchEvent(new CustomEvent("option-clicked", { bubbles: !0, composed: !0, detail: { value: this._value } })) } handleKeyDown(t) { "Enter" !== t.key && "Space" !== t.key || this.fireEvent() } connectedCallback() { this.setAttribute("role", "option"), this.setAttribute("tabindex", "0"), this._value = this.getAttribute("value"), this.addEventListener("click", this.fireEvent), this.addEventListener("keydown", this.handleKeyDown) } disconnectedCallback() { this.removeEventListener("click", this.fireEvent), this.removeEventListener("keydown", this.handleKeyDown) } });
const smCopy = document.createElement("template"); smCopy.innerHTML = '<style> *{ padding: 0; margin: 0; -webkit-box-sizing: border-box; box-sizing: border-box;} :host{ display: -webkit-box; display: flex; --padding: 0; --button-background-color: rgba(var(--text-color, (17,17,17)), 0.2);}.copy{ display: grid; gap: 0.5rem; padding: var(--padding); align-items: center; grid-template-columns: minmax(0, 1fr) auto;}:host(:not([clip-text])) .copy-content{ overflow-wrap: break-word; word-wrap: break-word;}:host([clip-text]) .copy-content{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}.copy-button{ display: inline-flex; justify-content: center; cursor: pointer; border: none; padding: 0.4rem; background-color: rgba(var(--text-color, (17,17,17)), 0.06); border-radius: var(--button-border-radius, 0.3rem); transition: background-color 0.2s; font-family: inherit; color: inherit; font-size: 0.7rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05rem;}.copy-button:active{ background-color: var(--button-background-color);}@media (any-hover: hover){ .copy:hover .copy-button{ opacity: 1; } .copy-button:hover{ background-color: var(--button-background-color); }}</style><section class="copy"> <p class="copy-content"> <slot></slot> </p> <button part="button" class="copy-button" title="copy"> <slot name="copy-icon"> COPY </slot> </button></section>', customElements.define("sm-copy", class extends HTMLElement { constructor() { super(), this.attachShadow({ mode: "open" }).append(smCopy.content.cloneNode(!0)), this.copyContent = this.shadowRoot.querySelector(".copy-content"), this.copyButton = this.shadowRoot.querySelector(".copy-button"), this.copy = this.copy.bind(this) } static get observedAttributes() { return ["value"] } set value(t) { this.setAttribute("value", t) } get value() { return this.getAttribute("value") } fireEvent() { this.dispatchEvent(new CustomEvent("copy", { composed: !0, bubbles: !0, cancelable: !0 })) } copy() { navigator.clipboard.writeText(this.getAttribute("value")).then(t => this.fireEvent()).catch(t => console.error(t)) } connectedCallback() { this.copyButton.addEventListener("click", this.copy) } attributeChangedCallback(t, n, o) { if ("value" === t) { const t = this.copyContent.querySelector("slot"); if (!t) return; const n = t.assignedNodes(); n && n.length || (t.textContent = o) } } disconnectedCallback() { this.copyButton.removeEventListener("click", this.copy) } });
const smForm = document.createElement("template"); smForm.innerHTML = ' <style> *{ padding: 0; margin: 0; box-sizing: border-box; } :host{ display: grid; width: 100%; } form{ display: inherit; gap: var(--gap, 1.5rem); width: 100%; } </style> <form part="form" onsubmit="return false"> <slot></slot> </form> ', customElements.define("sm-form", class extends HTMLElement { constructor() { super(), this.attachShadow({ mode: "open" }).append(smForm.content.cloneNode(!0)), this.form = this.shadowRoot.querySelector("form"), this.invalidFieldsCount, this.skipSubmit = !1, this.isFormValid = void 0, this.supportedElements = "input, sm-input, sm-textarea, sm-checkbox, tags-input, file-input, sm-switch, sm-radio", this.formElements = [], this._requiredElements = [], this.debounce = this.debounce.bind(this), this._checkValidity = this._checkValidity.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.reset = this.reset.bind(this), this.elementsChanged = this.elementsChanged.bind(this) } static get observedAttributes() { return ["skip-submit"] } get validity() { return this.isFormValid } debounce(e, t) { let i = null; return (...s) => { window.clearTimeout(i), i = window.setTimeout((() => { e.apply(null, s) }), t) } } _checkValidity() { this.submitButton && 0 !== this._requiredElements.length && (this.invalidFieldsCount = 0, this._requiredElements.forEach((([e, t]) => { (!e.disabled && t && !e.isValid || !t && !e.checkValidity()) && this.invalidFieldsCount++ })), this.isFormValid !== (0 === this.invalidFieldsCount) && (this.isFormValid = 0 === this.invalidFieldsCount, this.dispatchEvent(new CustomEvent(this.isFormValid ? "valid" : "invalid", { bubbles: !0, composed: !0 })), this.skipSubmit || (this.submitButton.disabled = !this.isFormValid))) } handleKeydown(e) { if ("Enter" === e.key && e.target.tagName.includes("INPUT")) if (0 === this.invalidFieldsCount) this.submitButton && this.submitButton.click(), this.dispatchEvent(new CustomEvent("submit", { bubbles: !0, composed: !0 })); else for (const [e, t] of this._requiredElements) { if (t ? !e.isValid : !e.checkValidity()) { (e?.shadowRoot?.lastElementChild || e).animate([{ transform: "translateX(-1rem)" }, { transform: "translateX(1rem)" }, { transform: "translateX(-0.5rem)" }, { transform: "translateX(0.5rem)" }, { transform: "translateX(0)" }], { duration: 300, easing: "ease" }), t ? e.focusIn() : e.focus(); break } } } reset() { this.formElements.forEach((([e, t]) => { if (t) e.reset(); else switch (e.type) { case "checkbox": case "radio": e.checked = !1; break; default: e.value = "" } })), this._checkValidity() } elementsChanged() { this.formElements = [...this.querySelectorAll(this.supportedElements)].map((e => [e, e.tagName.includes("-")])), this._requiredElements = this.formElements.filter((([e]) => e.hasAttribute("required"))), this.submitButton = this.querySelector('[variant="primary"], [type="submit"]'), this.resetButton = this.querySelector('[type="reset"]'), this.resetButton && this.resetButton.addEventListener("click", this.reset), this._checkValidity() } connectedCallback() { const e = this.debounce(this.elementsChanged, 100); this.addEventListener("input", this.debounce(this._checkValidity, 100)), this.addEventListener("keydown", this.debounce(this.handleKeydown, 100)), this.shadowRoot.querySelector("slot").addEventListener("slotchange", e), this.mutationObserver = new MutationObserver((t => { t.forEach((t => { ("childList" === t.type && [...t.addedNodes].some((e => 1 === e.nodeType && e.querySelector(this.supportedElements))) || [...t.removedNodes].some((e => 1 === e.nodeType && e.querySelector(this.supportedElements)))) && e() })) })), this.mutationObserver.observe(this, { childList: !0, subtree: !0 }) } attributeChangedCallback(e, t, i) { "skip-submit" === e && (this.skipSubmit = null !== i) } disconnectedCallback() { this.removeEventListener("input", this.debounce(this._checkValidity, 100)), this.removeEventListener("keydown", this.debounce(this.handleKeydown, 100)), this.mutationObserver.disconnect() } });
const smInput = document.createElement("template"); smInput.innerHTML = ' <style> *{ padding: 0; margin: 0; -webkit-box-sizing: border-box; box-sizing: border-box; }  input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-results-button, input[type="search"]::-webkit-search-results-decoration { display: none; } input[type=number] { -moz-appearance:textfield; } input[type=number]::-webkit-inner-spin-button,  input[type=number]::-webkit-outer-spin-button {  -webkit-appearance: none; -moz-appearance: none; appearance: none; margin: 0;  } input::-ms-reveal, input::-ms-clear { display: none; } input:invalid{ outline: none; -webkit-box-shadow: none; box-shadow: none; } ::-moz-focus-inner{ border: none; } :host{ display: flex; --success-color: #00C853; --danger-color: red; --width: 100%; --icon-gap: 0.5rem; --min-height: 3.2rem; --background: rgba(var(--text-color, (17,17,17)), 0.06); } .hidden{ display: none !important; } button{ display: flex; border: none; background: none; padding: 0; border-radius: 1rem; min-width: 0; cursor: pointer; } button:focus{ outline: var(--accent-color, teal) solid medium; } .icon { height: 1.2rem; width: 1.2rem; fill: rgba(var(--text-color, (17,17,17)), 0.6); }  :host(.round) .input{ border-radius: 10rem; } .input { display: flex; cursor: text; min-width: 0; text-align: left; align-items: center; position: relative; gap: var(--icon-gap); padding: var(--padding, 0.6rem 0.8rem); border-radius: var(--border-radius,0.3rem); transition: opacity 0.3s, box-shadow 0.2s; background: var(--background); width: 100%; outline: none; min-height: var(--min-height); } .input.readonly .clear{ opacity: 0 !important; margin-right: -2rem; pointer-events: none !important; } .readonly{ pointer-events: none; } .input:focus-within:not(.readonly){ box-shadow: 0 0 0 0.1rem var(--accent-color,teal) inset !important; } .disabled{ pointer-events: none; opacity: 0.6; } .label { grid-area: 1/1/2/2; font-size: inherit; opacity: .7; font-weight: 400; transition: -webkit-transform 0.3s; transition: transform 0.3s; transition: transform 0.3s, -webkit-transform 0.3s, color .03; transform-origin: left; pointer-events: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; user-select: none; will-change: transform; } .outer-container{ position: relative; width: var(--width); } .container{ width: 100%; display: grid; grid-template-columns: 1fr auto; position: relative; align-items: center; }  input{ grid-area: 1/1/2/2; font-size: inherit; border: none; background: transparent; outline: none; color: inherit; font-family: inherit; width: 100%; caret-color: var(--accent-color, teal); font-weight: inherit; } :host([animate]) .input:focus-within .container input, .animate-placeholder .container input { -webkit-transform: translateY(0.6rem); -ms-transform: translateY(0.6rem); transform: translateY(0.6rem); }  :host([animate]) .input:focus-within .label, .animate-placeholder .label { -webkit-transform: translateY(-0.7em) scale(0.8); -ms-transform: translateY(-0.7em) scale(0.8); transform: translateY(-0.7em) scale(0.8); opacity: 1; color: var(--accent-color,teal) } :host([variant="outlined"]) .input { box-shadow: 0 0 0 1px var(--border-color, rgba(var(--text-color, (17,17,17)), 0.3)) inset; background: rgba(var(--background-color, (255,255,255)), 1); } .animate-placeholder:focus-within:not(.readonly) .label{ color: var(--accent-color,teal) } .feedback-text:not(:empty){ display: flex; width: 100%; text-align: left; font-size: 0.9rem; align-items: center; padding: 0.8rem 0; color: rgba(var(--text-color, (17,17,17)), 0.8); } .success{ color: var(--success-color); } .error{ color: var(--danger-color); } .status-icon{ margin-right: 0.2rem; flex-shrink: 0; } .status-icon--error{ fill: var(--danger-color); } .status-icon--success{ fill: var(--success-color); } .datalist{ position: absolute; top: 100%; left: 0; width: 100%; z-index: 100; background: rgba(var(--foreground-color, (255,255,255)), 1); border-radius: 0 0 var(--border-radius,0.5rem) var(--border-radius,0.5rem); box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.1); max-height: 20rem; overflow-y: auto; overflow-x: hidden; padding: 0.3rem; } .datalist-item{ padding: 0.8rem 1rem; cursor: pointer; transition: background 0.2s; border-radius: 0.5rem; content-visibility: auto; } .datalist-item:focus{ outline: none; } .datalist-item:focus-visible{ outline: var(--accent-color, teal) solid medium; } @media (any-hover: hover){ .icon:hover{ background: rgba(var(--text-color, (17,17,17)), 0.1); } .datalist-item:hover{ background: rgba(var(--text-color, (17,17,17)), 0.06); } } </style> <div class="outer-container"> <label part="input-wrapper" class="input"> <slot name="icon"></slot> <div class="container"> <input part="input" type="text"/> <div part="placeholder" class="label"></div> <button class="clear hidden" title="Clear" tabindex="-1"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"/></svg> </button> </div> <slot name="right"></slot> </label> <ul class="datalist hidden"></ul> <p class="feedback-text"></p> </div> ', customElements.define("sm-input", class extends HTMLElement { constructor() { super(), this.attachShadow({ mode: "open" }).append(smInput.content.cloneNode(!0)), this.inputParent = this.shadowRoot.querySelector(".input"), this.input = this.shadowRoot.querySelector("input"), this.clearBtn = this.shadowRoot.querySelector(".clear"), this.label = this.shadowRoot.querySelector(".label"), this.feedbackText = this.shadowRoot.querySelector(".feedback-text"), this.outerContainer = this.shadowRoot.querySelector(".outer-container"), this.optionList = this.shadowRoot.querySelector(".datalist"), this._helperText = "", this._errorText = "Invalid", this.isRequired = !1, this.datalist = [], this.validationFunction = void 0, this.reflectedAttributes = ["value", "required", "disabled", "type", "inputmode", "readonly", "min", "max", "pattern", "minlength", "maxlength", "step", "list", "autocomplete"], this.reset = this.reset.bind(this), this.clear = this.clear.bind(this), this.focusIn = this.focusIn.bind(this), this.focusOut = this.focusOut.bind(this), this.fireEvent = this.fireEvent.bind(this), this.checkInput = this.checkInput.bind(this), this.showError = this.showError.bind(this), this.allowOnlyNum = this.allowOnlyNum.bind(this), this.handleOptionClick = this.handleOptionClick.bind(this), this.handleInputNavigation = this.handleInputNavigation.bind(this), this.handleDatalistNavigation = this.handleDatalistNavigation.bind(this), this.handleFocus = this.handleFocus.bind(this), this.handleBlur = this.handleBlur.bind(this) } static get observedAttributes() { return ["value", "placeholder", "required", "disabled", "type", "inputmode", "readonly", "min", "max", "pattern", "minlength", "maxlength", "step", "helper-text", "error-text", "list"] } get value() { return this.input.value } set value(t) { t !== this.input.value && (this.input.value = t, this.checkInput()) } get placeholder() { return this.getAttribute("placeholder") } set placeholder(t) { this.setAttribute("placeholder", t) } get type() { return this.getAttribute("type") } set type(t) { this.setAttribute("type", t) } get validity() { return this.input.validity } get disabled() { return this.hasAttribute("disabled") } set disabled(t) { t ? (this.inputParent.classList.add("disabled"), this.setAttribute("disabled", "")) : (this.inputParent.classList.remove("disabled"), this.removeAttribute("disabled")) } get readOnly() { return this.hasAttribute("readonly") } set readOnly(t) { t ? this.setAttribute("readonly", "") : this.removeAttribute("readonly") } set customValidation(t) { this.validationFunction = t } set errorText(t) { this._errorText = t } showError(t) { this.feedbackText.className = "feedback-text error", this.feedbackText.innerHTML = ` <svg class="status-icon status-icon--error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/></svg> ${t}` } set helperText(t) { this._helperText = t } get isValid() { if ("" !== this.input.value) { const t = this.input.checkValidity(); let e = { isValid: t, errorText: "" }; return this.validationFunction && (e = this.validationFunction(this.input.value)), t && e.isValid ? (this.feedbackText.className = "feedback-text success", this.feedbackText.textContent = "") : (e.errorText || this._errorText) && this.showError(e.errorText || this._errorText), t && e.isValid } } reset() { this.value = "" } clear() { this.value = "", this.input.focus(), this.fireEvent() } focusIn() { this.input.focus() } focusOut() { this.input.blur() } fireEvent() { let t = new Event("input", { bubbles: !0, cancelable: !0, composed: !0 }); this.dispatchEvent(t) } searchDatalist(t) { const e = this.datalist.filter(e => e.toLowerCase().includes(t.toLowerCase())); if (e.sort((e, n) => { const i = e.toLowerCase().indexOf(t.toLowerCase()), s = n.toLowerCase().indexOf(t.toLowerCase()); return i - s }), e.length) { if (this.optionList.children.length > e.length) { const t = this.optionList.children.length - e.length; for (let e = 0; e < t; e++)this.optionList.removeChild(this.optionList.lastChild) } e.forEach((t, e) => { if (this.optionList.children[e]) this.optionList.children[e].textContent = t; else { const e = document.createElement("li"); e.textContent = t, e.classList.add("datalist-item"), e.setAttribute("tabindex", "0"), this.optionList.appendChild(e) } }), this.optionList.classList.remove("hidden") } else this.optionList.classList.add("hidden") } checkInput(t) { this.hasAttribute("readonly") || ("" !== this.input.value ? this.clearBtn.classList.remove("hidden") : this.clearBtn.classList.add("hidden")), this.hasAttribute("placeholder") && "" !== this.getAttribute("placeholder").trim() && ("" !== this.input.value ? (this.animate ? this.inputParent.classList.add("animate-placeholder") : this.label.classList.add("hidden"), this.datalist.length && (this.searchTimeout && clearTimeout(this.searchTimeout), this.searchTimeout = setTimeout(() => { this.searchDatalist(this.input.value.trim()) }, 100))) : (this.animate ? this.inputParent.classList.remove("animate-placeholder") : this.label.classList.remove("hidden"), this.feedbackText.textContent = "", this.datalist.length && (this.optionList.innerHTML = "", this.optionList.classList.add("hidden")))) } allowOnlyNum(t) { 1 === t.key.length && (("." !== t.key || !t.target.value.includes(".") && 0 !== t.target.value.length) && ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(t.key) || t.preventDefault()) } handleOptionClick(t) { this.input.value = t.target.textContent, this.optionList.classList.add("hidden"), this.input.focus() } handleInputNavigation(t) { "ArrowDown" === t.key ? (t.preventDefault(), this.optionList.children.length && this.optionList.children[0].focus()) : "ArrowUp" === t.key && (t.preventDefault(), this.optionList.children.length && this.optionList.children[this.optionList.children.length - 1].focus()) } handleDatalistNavigation(t) { "ArrowUp" === t.key ? (t.preventDefault(), this.shadowRoot.activeElement.previousElementSibling ? this.shadowRoot.activeElement.previousElementSibling.focus() : this.input.focus()) : "ArrowDown" === t.key ? (t.preventDefault(), this.shadowRoot.activeElement.nextElementSibling ? this.shadowRoot.activeElement.nextElementSibling.focus() : this.input.focus()) : "Enter" !== t.key && " " !== t.key || (t.preventDefault(), this.input.value = t.target.textContent, this.optionList.classList.add("hidden"), this.input.focus()) } handleFocus(t) { this.datalist.length && this.searchDatalist(this.input.value.trim()) } handleBlur(t) { this.datalist.length && this.optionList.classList.add("hidden") } connectedCallback() { this.animate = this.hasAttribute("animate"), this.setAttribute("role", "textbox"), this.input.addEventListener("input", this.checkInput), this.clearBtn.addEventListener("click", this.clear), this.datalist.length && (this.optionList.addEventListener("click", this.handleOptionClick), this.input.addEventListener("keydown", this.handleInputNavigation), this.optionList.addEventListener("keydown", this.handleDatalistNavigation)), this.input.addEventListener("focusin", this.handleFocus), this.addEventListener("focusout", this.handleBlur) } attributeChangedCallback(t, e, n) { if (e !== n) switch (this.reflectedAttributes.includes(t) && (this.hasAttribute(t) ? this.input.setAttribute(t, this.getAttribute(t) ? this.getAttribute(t) : "") : this.input.removeAttribute(t)), t) { case "placeholder": this.label.textContent = n, this.setAttribute("aria-label", n); break; case "value": this.checkInput(); break; case "type": this.hasAttribute("type") && "number" === this.getAttribute("type") ? (this.input.setAttribute("inputmode", "decimal"), this.input.addEventListener("keydown", this.allowOnlyNum)) : this.input.removeEventListener("keydown", this.allowOnlyNum); break; case "helper-text": this._helperText = n; break; case "error-text": this._errorText = n; break; case "required": this.isRequired = this.hasAttribute("required"), this.isRequired ? this.setAttribute("aria-required", "true") : this.setAttribute("aria-required", "false"); break; case "readonly": this.hasAttribute("readonly") ? this.inputParent.classList.add("readonly") : this.inputParent.classList.remove("readonly"); break; case "disabled": this.hasAttribute("disabled") ? this.inputParent.classList.add("disabled") : this.inputParent.classList.remove("disabled"); break; case "list": this.hasAttribute("list") && "" !== this.getAttribute("list").trim() && (this.datalist = this.getAttribute("list").split(",")) } } disconnectedCallback() { this.input.removeEventListener("input", this.checkInput), this.clearBtn.removeEventListener("click", this.clear), this.input.removeEventListener("keydown", this.allowOnlyNum), this.optionList.removeEventListener("click", this.handleOptionClick), this.input.removeEventListener("keydown", this.handleInputNavigation), this.optionList.removeEventListener("keydown", this.handleDatalistNavigation), this.input.removeEventListener("focusin", this.handleFocus), this.removeEventListener("focusout", this.handleBlur) } });
class Stack { constructor() { this.items = [] } push(t) { this.items.push(t) } pop() { return 0 == this.items.length ? "Underflow" : this.items.pop() } peek() { return this.items[this.items.length - 1] } } const popupStack = new Stack, smPopup = document.createElement("template"); smPopup.innerHTML = ` <style> *{ padding: 0; margin: 0; -webkit-box-sizing: border-box; box-sizing: border-box; } :host{ position: fixed; display: -ms-grid; display: grid; z-index: 10; --width: 100%; --height: auto; --min-width: auto; --min-height: auto; --backdrop-background: rgba(0, 0, 0, 0.6); --border-radius: 0.8rem 0.8rem 0 0; } .popup-container{ display: -ms-grid; display: grid; position: fixed; top: 0; bottom: 0; left: 0; right: 0; place-items: center; z-index: 10; touch-action: none; } :host(.stacked) .popup{ -webkit-transform: scale(0.9) translateY(-2rem) !important; transform: scale(0.9) translateY(-2rem) !important; } .backdrop{ position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: var(--backdrop-background); -webkit-transition: opacity 0.3s; -o-transition: opacity 0.3s; transition: opacity 0.3s; } .popup{ display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; flex-direction: column; position: relative; -ms-flex-item-align: end; align-self: flex-end; -webkit-box-align: start; -ms-flex-align: start; align-items: flex-start; width: var(--width); min-width: var(--min-width); height: var(--height); min-height: var(--min-height); max-height: 90vh; border-radius: var(--border-radius); background: rgba(var(--background-color, (255,255,255)), 1); -webkit-box-shadow: 0 -1rem 2rem #00000020; box-shadow: 0 -1rem 2rem #00000020; } .container-header{ display: -webkit-box; display: flex; width: 100%; touch-action: none; -webkit-box-align: center; -ms-flex-align: center; align-items: center; } .popup-top{ display: -webkit-box; display: flex; width: 100%; } .popup-body{ display: -webkit-box; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; -webkit-box-flex: 1; -ms-flex: 1; flex: 1; width: 100%; padding: var(--body-padding, 1.5rem); overflow-y: auto; } .hide{ display:none; } @media screen and (min-width: 640px){ :host{ --border-radius: 0.5rem; } .popup{ -ms-flex-item-align: center; -ms-grid-row-align: center; align-self: center; border-radius: var(--border-radius); height: var(--height); -webkit-box-shadow: 0 3rem 2rem -0.5rem #00000040; box-shadow: 0 3rem 2rem -0.5rem #00000040; } } @media screen and (max-width: 640px){ .popup-top{ -webkit-box-orient: vertical; -webkit-box-direction: normal; flex-direction: column; -webkit-box-align: center; align-items: center; } .handle{ height: 0.3rem; width: 2rem; background: rgba(var(--text-color, (17,17,17)), .4); border-radius: 1rem; margin: 0.5rem 0; } } @media (any-hover: hover){ ::-webkit-scrollbar{ width: 0.5rem; } ::-webkit-scrollbar-thumb{ background: rgba(var(--text-color, (17,17,17)), 0.3); border-radius: 1rem; &:hover{ background: rgba(var(--text-color, (17,17,17))), 0.5); } } } </style> <div class="popup-container hide" role="dialog"> <div part="backdrop" class="backdrop"></div> <div part="popup" class="popup"> <div part="popup-header" class="popup-top"> <div class="handle"></div> <slot name="header"></slot> </div> <div part="popup-body" class="popup-body"> <slot></slot> </div> </div> </div> `, customElements.define("sm-popup", class extends HTMLElement { constructor() { super(), this.attachShadow({ mode: "open" }).append(smPopup.content.cloneNode(!0)), this.allowClosing = !1, this.isOpen = !1, this.offset = 0, this.touchStartY = 0, this.touchEndY = 0, this.touchStartTime = 0, this.touchEndTime = 0, this.touchEndAnimation = void 0, this.focusable, this.autoFocus, this.mutationObserver, this.popupContainer = this.shadowRoot.querySelector(".popup-container"), this.backdrop = this.shadowRoot.querySelector(".backdrop"), this.dialogBox = this.shadowRoot.querySelector(".popup"), this.popupBodySlot = this.shadowRoot.querySelector(".popup-body slot"), this.popupHeader = this.shadowRoot.querySelector(".popup-top"), this.resumeScrolling = this.resumeScrolling.bind(this), this.setStateOpen = this.setStateOpen.bind(this), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.handleTouchStart = this.handleTouchStart.bind(this), this.handleTouchMove = this.handleTouchMove.bind(this), this.handleTouchEnd = this.handleTouchEnd.bind(this), this.detectFocus = this.detectFocus.bind(this), this.handleSoftDismiss = this.handleSoftDismiss.bind(this), this.debounce = this.debounce.bind(this) } static get observedAttributes() { return ["open"] } get open() { return this.isOpen } animateTo(t, e, i) { let s = t.animate(e, { ...i, fill: "both" }); return s.finished.then(() => { s.commitStyles(), s.cancel() }), s } resumeScrolling() { let t = document.body.style.top; window.scrollTo(0, -1 * parseInt(t || "0")), document.body.style.overflow = "", document.body.style.top = "initial" } setStateOpen() { if (!this.isOpen || this.offset) { let t = window.innerWidth > 640 ? "scale(1.1)" : `translateY(${this.offset ? `${this.offset}px` : "100%"})`; this.animateTo(this.dialogBox, [{ opacity: this.offset ? 1 : 0, transform: t }, { opacity: 1, transform: "none" },], { duration: 300, easing: "ease" }) } } show(t = {}) { let { pinned: e = !1, payload: i } = t; if (this.isOpen) return; let s = { duration: 300, easing: "ease" }; return this.payload = i, popupStack.push({ popup: this, permission: e }), popupStack.items.length > 1 && this.animateTo(popupStack.items[popupStack.items.length - 2].popup.shadowRoot.querySelector(".popup"), [{ transform: "none" }, { transform: window.innerWidth > 640 ? "scale(0.95)" : "translateY(-1.5rem)" },], s), this.popupContainer.classList.remove("hide"), this.offset || (this.backdrop.animate([{ opacity: 0 }, { opacity: 1 },], s).onfinish = () => { this.resolveOpen(this.payload) }, this.dispatchEvent(new CustomEvent("popupopened", { bubbles: !0, composed: !0, detail: { payload: this.payload } })), document.body.style.overflow = "hidden", document.body.style.top = `-${window.scrollY}px`), this.setStateOpen(), this.pinned = e, this.isOpen = !0, setTimeout(() => { let t = this.autoFocus || this.focusable?.[0] || this.dialogBox; t && (t.tagName.includes("-") ? t.focusIn() : t.focus()) }, 0), this.hasAttribute("open") || (this.setAttribute("open", ""), this.addEventListener("keydown", this.detectFocus), this.resizeObserver.observe(this), this.mutationObserver.observe(this, { attributes: !0, childList: !0, subtree: !0 }), this.popupHeader.addEventListener("touchstart", this.handleTouchStart, { passive: !0 }), this.backdrop.addEventListener("mousedown", this.handleSoftDismiss)), { opened: new Promise(t => { this.resolveOpen = t }), closed: new Promise(t => { this.resolveClose = t }) } } hide(t = {}) { let { payload: e } = t, i = { duration: 150, easing: "ease" }; this.backdrop.animate([{ opacity: 1 }, { opacity: 0 }], i), this.animateTo(this.dialogBox, [{ opacity: 1, transform: window.innerWidth > 640 ? "none" : `translateY(${this.offset ? `${this.offset}px` : "0"})` }, { opacity: 0, transform: window.innerWidth > 640 ? "scale(1.1)" : "translateY(100%)" },], i).finished.finally(() => { this.popupContainer.classList.add("hide"), this.dialogBox.style = "", this.removeAttribute("open"), this.forms.length && this.forms.forEach(t => t.reset()), this.dispatchEvent(new CustomEvent("popupclosed", { bubbles: !0, composed: !0, detail: { payload: e || this.payload } })), this.resolveClose(e || this.payload), this.isOpen = !1 }), popupStack.pop(), popupStack.items.length ? this.animateTo(popupStack.items[popupStack.items.length - 1].popup.shadowRoot.querySelector(".popup"), [{ transform: window.innerWidth > 640 ? "scale(0.95)" : "translateY(-1.5rem)" }, { transform: "none" },], i) : this.resumeScrolling(), this.resizeObserver.disconnect(), this.mutationObserver.disconnect(), this.removeEventListener("keydown", this.detectFocus), this.popupHeader.removeEventListener("touchstart", this.handleTouchStart, { passive: !0 }), this.backdrop.removeEventListener("mousedown", this.handleSoftDismiss) } handleTouchStart(t) { this.offset = 0, this.popupHeader.addEventListener("touchmove", this.handleTouchMove, { passive: !0 }), this.popupHeader.addEventListener("touchend", this.handleTouchEnd, { passive: !0 }), this.touchStartY = t.changedTouches[0].clientY, this.touchStartTime = t.timeStamp } handleTouchMove(t) { this.touchStartY < t.changedTouches[0].clientY && (this.offset = t.changedTouches[0].clientY - this.touchStartY, this.touchEndAnimation = window.requestAnimationFrame(() => { this.dialogBox.style.transform = `translateY(${this.offset}px)` })) } handleTouchEnd(t) { if (this.touchEndTime = t.timeStamp, cancelAnimationFrame(this.touchEndAnimation), this.touchEndY = t.changedTouches[0].clientY, this.threshold = .3 * this.dialogBox.getBoundingClientRect().height, this.touchEndTime - this.touchStartTime > 200) { if (this.touchEndY - this.touchStartY > this.threshold) { if (this.pinned) { this.setStateOpen(); return } this.hide() } else this.setStateOpen() } else if (this.touchEndY > this.touchStartY) { if (this.pinned) { this.setStateOpen(); return } this.hide() } this.popupHeader.removeEventListener("touchmove", this.handleTouchMove, { passive: !0 }), this.popupHeader.removeEventListener("touchend", this.handleTouchEnd, { passive: !0 }) } detectFocus(t) { if ("Tab" === t.key && this.focusable.length) { if (!this.firstFocusable) { for (let e = 0; e < this.focusable.length; e++)if (!this.focusable[e].disabled) { this.firstFocusable = this.focusable[e]; break } } if (!this.lastFocusable) { for (let i = this.focusable.length - 1; i >= 0; i--)if (!this.focusable[i].disabled) { this.lastFocusable = this.focusable[i]; break } } t.shiftKey && document.activeElement === this.firstFocusable ? (t.preventDefault(), this.lastFocusable.tagName.includes("SM-") ? this.lastFocusable.focusIn() : this.lastFocusable.focus()) : t.shiftKey || document.activeElement !== this.lastFocusable || (t.preventDefault(), this.firstFocusable.tagName.includes("SM-") ? this.firstFocusable.focusIn() : this.firstFocusable.focus()) } } updateFocusableList() { this.focusable = this.querySelectorAll('sm-button:not([disabled]), button:not([disabled]), [href], sm-input, input:not([readonly]), sm-select, select, sm-checkbox, sm-textarea, textarea, [tabindex]:not([tabindex="-1"])'), this.autoFocus = this.querySelector("[autofocus]"), this.firstFocusable = null, this.lastFocusable = null } handleSoftDismiss() { this.pinned ? this.dialogBox.animate([{ transform: "translateX(-1rem)" }, { transform: "translateX(1rem)" }, { transform: "translateX(-0.5rem)" }, { transform: "translateX(0.5rem)" }, { transform: "translateX(0)" },], { duration: 300, easing: "ease" }) : this.hide() } debounce(t, e) { let i = null; return (...s) => { window.clearTimeout(i), i = window.setTimeout(() => { t.apply(null, s) }, e) } } connectedCallback() { this.popupBodySlot.addEventListener("slotchange", this.debounce(() => { this.forms = this.querySelectorAll("sm-form"), this.updateFocusableList() }, 0)), this.resizeObserver = new ResizeObserver(t => { t.forEach(t => { if (t.contentBoxSize) { let e = Array.isArray(t.contentBoxSize) ? t.contentBoxSize[0] : t.contentBoxSize; this.threshold = .3 * e.blockSize.height } else this.threshold = .3 * t.contentRect.height }) }), this.mutationObserver = new MutationObserver(t => { this.updateFocusableList() }) } disconnectedCallback() { this.resizeObserver.disconnect(), this.mutationObserver.disconnect(), this.removeEventListener("keydown", this.detectFocus), this.popupHeader.removeEventListener("touchstart", this.handleTouchStart, { passive: !0 }), this.backdrop.removeEventListener("mousedown", this.handleSoftDismiss) } attributeChangedCallback(t) { "open" === t && this.hasAttribute("open") && this.show() } });
const smSelect = document.createElement("template"); smSelect.innerHTML = '<style> *{ padding: 0; margin: 0; box-sizing: border-box;} :host{ display: flex;}:host([disabled]) .select{ opacity: 0.6; cursor: not-allowed;}:host([readonly]) .select{ cursor: default; pointer-events: none;}.select{ position: relative; display: flex; flex-direction: column; cursor: pointer; width: 100%; -webkit-tap-highlight-color: transparent;}.icon { height: 1.2rem; width: 1.2rem; margin-left: 0.5rem; fill: rgba(var(--text-color, (17,17,17)), 0.7);} .selected-option-text{ font-size: inherit; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500;}.selection{ border-radius: var(--select-border-radius,0.5rem); display: grid; grid-template-columns: 1fr auto; grid-template-areas: \'heading heading\' \'. .\'; padding: var(--padding,0.6rem 0.8rem); background: var(--background, rgba(var(--text-color,(17,17,17)), 0.06)); align-items: center; outline: none; z-index: 2; height: 100%; align-content: center;}.selection:focus{ box-shadow: 0 0 0 0.1rem var(--accent-color, teal) inset; }:host([align-select="left"]) .options{ left: 0;}:host([align-select="right"]) .options{ right: 0;}.options{ top: 100%; padding: var(--options-padding, 0.3rem); margin-top: 0.2rem;  overflow: hidden auto; position: absolute; grid-area: options; display: flex; flex-direction: column; width: var(--options-width, 100%); min-width: var(--min-width, auto); max-height: var(--max-height, auto); background: rgba(var(--foreground-color,(255,255,255)), 1); border: solid 1px rgba(var(--text-color,(17,17,17)), 0.2); border-radius: var(--options-border-radius, 0.5rem); z-index: 1; box-shadow: 0 1rem 1.5rem rgba(0 0 0 /0.2);}:host([isUnder]) .options{ top: auto; bottom: 100%; margin-top: 0; margin-bottom: 0.2rem; box-shadow: 0 -1rem 1.5rem rgba(0 0 0 /0.2);}:host([open]) .icon--expand{ display: none;}:host([open]) .icon--collapse{ display: block;}.icon--expand{ display: block;}.icon--collapse{ display: none;}.hidden{ display: none;}@media (any-hover: hover){ ::-webkit-scrollbar{ width: 0.5rem; height: 0.5rem; }  ::-webkit-scrollbar-thumb{ background: rgba(var(--text-color,(17,17,17)), 0.3); border-radius: 1rem; &:hover{ background: rgba(var(--text-color,(17,17,17)), 0.5); } }}</style><div class="select"> <div class="selection" part="button"> <div class="selected-option-text"></div> <svg class="icon icon--expand" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"/></svg> <svg class="icon icon--collapse" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M24 0v24H0V0h24z" fill="none" opacity=".87"/><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"/></svg> </div> <div part="options" class="options hidden"> <slot></slot>  </div></div>', customElements.define("sm-select", class extends HTMLElement { constructor() { super(), this.attachShadow({ mode: "open" }).append(smSelect.content.cloneNode(!0)), this.focusIn = this.focusIn.bind(this), this.reset = this.reset.bind(this), this.open = this.open.bind(this), this.collapse = this.collapse.bind(this), this.toggle = this.toggle.bind(this), this.handleOptionsNavigation = this.handleOptionsNavigation.bind(this), this.handleOptionSelection = this.handleOptionSelection.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.handleClickOutside = this.handleClickOutside.bind(this), this.selectOption = this.selectOption.bind(this), this.debounce = this.debounce.bind(this), this.elementsChanged = this.elementsChanged.bind(this), this.availableOptions = [], this.previousOption, this.isOpen = !1, this.label = "", this.defaultSelected = "", this.isUnderViewport = !1, this.animationOptions = { duration: 300, fill: "forwards", easing: "ease" }, this.optionList = this.shadowRoot.querySelector(".options"), this.selection = this.shadowRoot.querySelector(".selection"), this.selectedOptionText = this.shadowRoot.querySelector(".selected-option-text") } static get observedAttributes() { return ["disabled", "label", "readonly"] } get value() { return this.getAttribute("value") } set value(t) { const e = this.availableOptions.find(e => e.getAttribute("value") === t); e ? (this.setAttribute("value", t), this.selectOption(e)) : console.warn(`There is no option with ${t} as value`) } debounce(t, e) { let n = null; return (...i) => { window.clearTimeout(n), n = window.setTimeout(() => { t.apply(null, i) }, e) } } reset(t = !0) { if (this.availableOptions[0] && this.previousOption !== this.availableOptions[0]) { const e = this.availableOptions.find(t => t.hasAttribute("selected") && "true" === t.getAttribute("selected")) || this.availableOptions[0]; this.value = e.getAttribute("value"), t && this.fireEvent() } } selectOption(t) { this.previousOption !== t && (this.querySelectorAll('[selected="true"]').forEach(t => t.removeAttribute("selected")), this.selectedOptionText.textContent = `${this.label}${t.textContent}`, t.setAttribute("selected", "true"), this.previousOption = t) } focusIn() { this.selection.focus() } open() { this.availableOptions.forEach(t => t.setAttribute("tabindex", 0)), this.optionList.classList.remove("hidden"), this.isUnderViewport = this.getBoundingClientRect().bottom + this.optionList.getBoundingClientRect().height > window.innerHeight, this.isUnderViewport ? this.setAttribute("isUnder", "") : this.removeAttribute("isUnder"), this.optionList.animate([{ transform: `translateY(${this.isUnderViewport ? "" : "-"}0.5rem)`, opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], this.animationOptions), this.setAttribute("open", ""), this.style.zIndex = 1e3, (this.availableOptions.find(t => t.hasAttribute("selected") && "true" === t.getAttribute("selected")) || this.availableOptions[0]).focus(), document.addEventListener("mousedown", this.handleClickOutside), this.isOpen = !0 } collapse() { this.removeAttribute("open"), this.optionList.animate([{ transform: "translateY(0)", opacity: 1 }, { transform: `translateY(${this.isUnderViewport ? "" : "-"}0.5rem)`, opacity: 0 }], this.animationOptions).onfinish = (() => { this.availableOptions.forEach(t => t.removeAttribute("tabindex")), document.removeEventListener("mousedown", this.handleClickOutside), this.optionList.classList.add("hidden"), this.isOpen = !1, this.style.zIndex = "auto" }) } toggle() { this.isOpen || this.hasAttribute("disabled") ? this.collapse() : this.open() } fireEvent() { this.dispatchEvent(new CustomEvent("change", { bubbles: !0, composed: !0, detail: { value: this.value } })) } handleOptionsNavigation(t) { "ArrowUp" === t.key ? (t.preventDefault(), document.activeElement.previousElementSibling ? document.activeElement.previousElementSibling.focus() : this.availableOptions[this.availableOptions.length - 1].focus()) : "ArrowDown" === t.key && (t.preventDefault(), document.activeElement.nextElementSibling ? document.activeElement.nextElementSibling.focus() : this.availableOptions[0].focus()) } handleOptionSelection(t) { this.previousOption !== document.activeElement && (this.value = document.activeElement.getAttribute("value"), this.fireEvent()) } handleClick(t) { t.target === this ? this.toggle() : (this.handleOptionSelection(), this.collapse()) } handleKeydown(t) { t.target === this ? this.isOpen && "ArrowDown" === t.key ? (t.preventDefault(), (this.availableOptions.find(t => t.hasAttribute("selected") && "true" === t.getAttribute("selected")) || this.availableOptions[0]).focus(), this.handleOptionSelection(t)) : " " === t.key && (t.preventDefault(), this.toggle()) : (this.handleOptionsNavigation(t), this.handleOptionSelection(t), ["Enter", " ", "Escape", "Tab"].includes(t.key) && (t.preventDefault(), this.collapse(), this.focusIn())) } handleClickOutside(t) { this.isOpen && !this.contains(t.target) && this.collapse() } elementsChanged() { this.availableOptions = [...this.querySelectorAll("sm-option")], this.reset(!1), this.defaultSelected = this.value } connectedCallback() { this.setAttribute("role", "listbox"), this.hasAttribute("disabled") || this.hasAttribute("readonly") || (this.selection.setAttribute("tabindex", "0"), this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown)); const t = this.debounce(this.elementsChanged, 100); this.shadowRoot.querySelector("slot").addEventListener("slotchange", t), this.mutationObserver = new MutationObserver(e => { let n = !1; if (e.forEach(e => { switch (e.type) { case "childList": t(); break; case "attributes": n = !0 } }), n) { const t = this.availableOptions.find(t => t.hasAttribute("selected") && "true" === t.getAttribute("selected")) || this.availableOptions[0]; this.selectedOptionText.textContent = `${this.label}${t.textContent}`, this.setAttribute("value", t.getAttribute("value")) } }), this.mutationObserver.observe(this, { subtree: !0, childList: !0, attributeFilter: ["selected"] }), new IntersectionObserver((t, e) => { t.forEach(t => { if (t.isIntersecting) { const t = this.selection.getBoundingClientRect().left; t < window.innerWidth / 2 ? this.setAttribute("align-select", "left") : this.setAttribute("align-select", "right") } }) }).observe(this) } disconnectedCallback() { this.removeEventListener("click", this.handleClick), this.removeEventListener("keydown", this.handleKeydown) } attributeChangedCallback(t) { "disabled" === t || "readonly" === t ? this.hasAttribute("disabled") || this.hasAttribute("readonly") ? (this.selection.removeAttribute("tabindex"), this.removeEventListener("click", this.handleClick), this.removeEventListener("keydown", this.handleKeydown)) : (this.selection.setAttribute("tabindex", "0"), this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown)) : "label" === t && (this.label = this.hasAttribute("label") ? `${this.getAttribute("label")} ` : "") } }); const smOption = document.createElement("template"); smOption.innerHTML = '<style> *{ padding: 0; margin: 0; -webkit-box-sizing: border-box; box-sizing: border-box;} :host{ display: -webkit-box; display: -ms-flexbox; display: flex; overflow: hidden; border-radius: var(--border-radius, 0.3rem);}.option{ position: relative; display: flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; width: 100%; gap: 0.5rem; padding: var(--padding, 0.6rem 1rem); cursor: pointer; outline: none; user-select: none;}.option::before{ position: absolute; content: \'\'; display: block; width: 0.2rem; height: 1em; left: 0; border-radius: 0 1em 1em 0; background: rgba(var(--text-color,(17,17,17)), 0.5); transition: all 0.2s ease-in-out; opacity: 0;}:host(:focus){ outline: none; background: rgba(var(--text-color,(17,17,17)), 0.1);}:host(:focus) .option::before{ opacity: 1}:host([selected="true"]) .option::before{ opacity: 1; background: var(--accent-color, teal);}@media (hover: hover){ .option:hover{ background: rgba(var(--text-color,(17,17,17)), 0.1); } :host(:not([selected="true"]):hover) .option::before{ opacity: 1 }}</style><div class="option" part="option"> <slot></slot> </div>', customElements.define("sm-option", class extends HTMLElement { constructor() { super(), this.attachShadow({ mode: "open" }).append(smOption.content.cloneNode(!0)) } connectedCallback() { this.setAttribute("role", "option") } });
const spinner = document.createElement("template"); spinner.innerHTML = '<style> *{ padding: 0; margin: 0; -webkit-box-sizing: border-box; box-sizing: border-box;}.loader { display: flex; height: var(--size, 1.5rem); width: var(--size, 1.5rem); stroke-width: 8; overflow: visible; stroke: var(--accent-color, teal); fill: none; stroke-dashoffset: 180; stroke-dasharray: 180; animation: load 2s infinite, spin 1s linear infinite;}@keyframes load { 50% { stroke-dashoffset: 0; } 100%{ stroke-dashoffset: -180; }}@keyframes spin { 100% { transform: rotate(360deg); }}</style><svg viewBox="0 0 64 64" class="loader"><circle cx="32" cy="32" r="32" /></svg>'; class SpinnerLoader extends HTMLElement { constructor() { super(), this.attachShadow({ mode: "open" }).append(spinner.content.cloneNode(!0)) } } window.customElements.define("sm-spinner", SpinnerLoader);
const themeToggle = document.createElement("template"); themeToggle.innerHTML = ' <style> *{ padding: 0; margin: 0; box-sizing: border-box; } :host{ cursor: pointer; --height: 2.5rem; --width: 2.5rem; } .theme-toggle { display: flex; position: relative; width: 1.2rem; height: 1.2rem; cursor: pointer; -webkit-tap-highlight-color: transparent; } .theme-toggle::after{ content: \'\'; position: absolute; height: var(--height); width: var(--width); top: 50%; left: 50%; opacity: 0; border-radius: 50%; pointer-events: none; transition: transform 0.3s, opacity 0.3s; transform: translate(-50%, -50%) scale(1.2); background-color: rgba(var(--text-color,inherit), 0.12); } :host(:focus-within) .theme-toggle{ outline: none; } :host(:focus-within) .theme-toggle::after{ opacity: 1; transform: translate(-50%, -50%) scale(1); } .icon { position: absolute; height: 100%; width: 100%; fill: rgba(var(--text-color,inherit), 1); transition: transform 0.3s, opacity 0.1s; }  .theme-switcher__checkbox { display: none; } :host([checked]) .moon-icon { transform: translateY(50%); opacity: 0; } :host(:not([checked])) .sun-icon { transform: translateY(50%); opacity: 0; } </style> <label class="theme-toggle" title="Change theme" tabindex="0"> <slot name="light-mode-icon"> <svg xmlns="http://www.w3.org/2000/svg" class="icon moon-icon" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/></svg> </slot> <slot name="dark-mode-icon"> <svg xmlns="http://www.w3.org/2000/svg" class="icon sun-icon" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg> </slot> </label>'; class ThemeToggle extends HTMLElement { constructor() { super(), this.attachShadow({ mode: "open" }).append(themeToggle.content.cloneNode(!0)), this.isChecked = !1, this.hasTheme = "light", this.toggleState = this.toggleState.bind(this), this.fireEvent = this.fireEvent.bind(this), this.handleThemeChange = this.handleThemeChange.bind(this) } static get observedAttributes() { return ["checked"] } daylight() { this.hasTheme = "light", document.body.dataset.theme = "light", this.setAttribute("aria-checked", "false") } nightlight() { this.hasTheme = "dark", document.body.dataset.theme = "dark", this.setAttribute("aria-checked", "true") } toggleState() { if (!document.startViewTransition) return this.toggleAttribute("checked"), void this.fireEvent(); document.startViewTransition(() => { this.toggleAttribute("checked"), this.fireEvent() }) } handleKeyDown(e) { " " === e.key && this.toggleState() } handleThemeChange(e) { e.detail.theme !== this.hasTheme && ("dark" === e.detail.theme ? this.setAttribute("checked", "") : this.removeAttribute("checked")) } fireEvent() { this.dispatchEvent(new CustomEvent("themechange", { bubbles: !0, composed: !0, detail: { theme: this.hasTheme } })) } connectedCallback() { this.setAttribute("role", "switch"), this.setAttribute("aria-label", "theme toggle"), "dark" === localStorage.getItem(`${window.location.hostname}-theme`) ? (this.nightlight(), this.setAttribute("checked", "")) : "light" === localStorage.getItem(`${window.location.hostname}-theme`) ? (this.daylight(), this.removeAttribute("checked")) : window.matchMedia("(prefers-color-scheme: dark)").matches ? (this.nightlight(), this.setAttribute("checked", "")) : (this.daylight(), this.removeAttribute("checked")), this.addEventListener("click", this.toggleState), this.addEventListener("keydown", this.handleKeyDown), document.addEventListener("themechange", this.handleThemeChange) } disconnectedCallback() { this.removeEventListener("click", this.toggleState), this.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("themechange", this.handleThemeChange) } attributeChangedCallback(e, t, n) { "checked" === e && (this.hasAttribute("checked") ? (this.nightlight(), localStorage.setItem(`${window.location.hostname}-theme`, "dark")) : (this.daylight(), localStorage.setItem(`${window.location.hostname}-theme`, "light"))) } } window.customElements.define("theme-toggle", ThemeToggle);
//notifications

const smNotifications = document.createElement('template')
smNotifications.innerHTML = `
        <style>
            *{
                padding: 0;
                margin: 0;
                -webkit-box-sizing: border-box;
                        box-sizing: border-box;
            } 
            :host{
                display: flex;
                --icon-height: 1.5rem;
                --icon-width: 1.5rem;
            }
            .hide{
                opacity: 0 !important;
                pointer-events: none !important;
            }
            .notification-panel{
                display: grid;
                width: min(26rem, 100%);
                gap: 0.5rem;
                position: fixed;
                left: 0;
                top: 0;
                z-index: 100;
                max-height: 100%;
                padding: 1rem;
                overflow: hidden auto;
                overscroll-behavior: contain;
                touch-action: none;
            }
            .notification-panel:empty{
                display:none;
            }
            .notification{
                display: flex;
                position: relative;
                border-radius: 0.5rem;
                background: rgba(var(--foreground-color, (255,255,255)), 1);
                overflow: hidden;
                overflow-wrap: break-word;
                word-wrap: break-word;
                word-break: break-word;
                padding: max(1rem,1.5vw);
                align-items: center;
                box-shadow: 0 0.5rem 1rem 0 rgba(0,0,0,0.14);
                touch-action: none;
            }
            .notification:not(.pinned)::before{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                height: 0.2rem;
                width: 100%;
                background-color: var(--accent-color, teal);
                transform: scaleX(0);
                animation: loading var(--timeout, 5000ms) linear forwards;
                transform-origin: left;
            }
            @keyframes loading{
                0%{
                    transform: scaleX(0);
                }
                100%{
                    transform: scaleX(1);
                }
            }
            .icon-container:not(:empty){
                margin-right: 0.5rem;
                height: var(--icon-height);
                width: var(--icon-width);
                flex-shrink: 0;
            }
            .notification:last-of-type{
                margin-bottom: 0;
            }
            .icon {
                height: 100%;
                width: 100%;
                fill: rgba(var(--text-color, (17,17,17)), 0.7);
            }
            .icon--success {
                fill: var(--green);
            }
            .icon--failure,
            .icon--error {
            fill: var(--danger-color);
            }
            output{
                width: 100%;
            }
            .close{
                height: 2rem;
                width: 2rem;
                border: none;
                cursor: pointer;
                margin-left: 1rem;
                border-radius: 50%;
                padding: 0.3rem;
                transition: background-color 0.3s, transform 0.3s;
                background-color: transparent;
                flex-shrink: 0;
            }
            .close:active{
                transform: scale(0.9);
            }
            .action{
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.5rem 0.8rem;
                border-radius: 0.2rem;
                border: none;
                background-color: rgba(var(--text-color, (17,17,17)), 0.03);
                font-family: inherit;
                font-size: inherit;
                color: var(--accent-color, teal);
                font-weight: 500;
                cursor: pointer;
            }
            @media screen and (max-width: 640px){
                .close{
                    display: none;
                }
                .notification-panel:not(:empty){
                    padding-bottom: 3rem;
                }
            }
            @media screen and (min-width: 640px){
                .notification-panel{
                    top: auto;
                    bottom: 0;
                    max-width: max-content;
                }
                .notification{
                    width: auto;
                    max-width: max-content; 
                    border: solid 1px rgba(var(--text-color, (17,17,17)), 0.2);
                }
            }
            @media (any-hover: hover){
                ::-webkit-scrollbar{
                    width: 0.5rem;
                }
                
                ::-webkit-scrollbar-thumb{
                    background: rgba(var(--text-color, (17,17,17)), 0.3);
                    border-radius: 1rem;
                    &:hover{
                        background: rgba(var(--text-color, (17,17,17)), 0.5);
                    }
                }
                .close:hover{
                    background-color: rgba(var(--text-color, (17,17,17)), 0.1);
                }
            }
        </style>
        <div class="notification-panel"></div>
        `;
customElements.define('sm-notifications', class extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: 'open'
        }).append(smNotifications.content.cloneNode(true))

        this.notificationPanel = this.shadowRoot.querySelector('.notification-panel')
        this.animationOptions = {
            duration: 300,
            fill: "forwards",
            easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }

        this.push = this.push.bind(this)
        this.createNotification = this.createNotification.bind(this)
        this.removeNotification = this.removeNotification.bind(this)
        this.clearAll = this.clearAll.bind(this)
        this.remove = this.remove.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)


        this.startX = 0;
        this.currentX = 0;
        this.endX = 0;
        this.swipeDistance = 0;
        this.swipeDirection = '';
        this.swipeThreshold = 0;
        this.startTime = 0;
        this.swipeTime = 0;
        this.swipeTimeThreshold = 200;
        this.currentTarget = null;
        this.notificationTimeout = 5000;

        this.mediaQuery = window.matchMedia('(min-width: 640px)')
        this.handleOrientationChange = this.handleOrientationChange.bind(this)
        this.isBigViewport = false
    }
    set timeout(value) {
        if (isNaN(value)) return;
        this.notificationTimeout = value;
    }
    randString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < length; i++)
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        return result;
    }

    createNotification(message, options = {}) {
        const { pinned = false, icon, action, timeout = this.notificationTimeout } = options;
        const notification = document.createElement('div')
        notification.id = this.randString(8)
        notification.className = `notification ${pinned ? 'pinned' : ''}`
        notification.style.setProperty('--timeout', `${timeout}ms`);
        notification.innerHTML = `
            ${icon ? `<div class="icon-container">${icon}</div>` : ''}
            <output>${message}</output>
            ${action ? `<button class="action">${action.label}</button>` : ''}
            <button class="close">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
            </button>
        `;
        if (action) {
            notification.querySelector('.action').addEventListener('click', action.callback)
        }
        notification.querySelector('.close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
        if (pinned) {
        } else {
            setTimeout(() => {
                this.removeNotification(notification, this.isBigViewport ? 'left' : 'top');
            }, timeout);
        }
        return notification;
    }

    push(message, options = {}) {
        const notification = this.createNotification(message, options);
        if (this.isBigViewport)
            this.notificationPanel.append(notification);
        else
            this.notificationPanel.prepend(notification);
        notification.scrollIntoView({ behavior: 'smooth' });
        this.notificationPanel.animate(
            [
                {
                    transform: `translateY(${this.isBigViewport ? '' : '-'}${notification.clientHeight}px)`,
                },
                {
                    transform: `none`,
                },
            ], this.animationOptions
        )
        notification.animate([
            {
                transform: `translateY(-1rem)`,
                opacity: '0'
            },
            {
                transform: `none`,
                opacity: '1'
            },
        ], this.animationOptions).onfinish = (e) => {
            e.target.commitStyles()
            e.target.cancel()
        }
        return notification.id;
    }

    removeNotification(notification, direction = 'left') {
        if (!notification) return;
        const sign = direction === 'left' || direction === 'top' ? '-' : '+';

        if (!this.isBigViewport && direction === 'top') {
            notification.animate([
                {
                    transform: this.currentX ? `translateY(${this.currentX}px)` : `none`,
                    opacity: '1'
                },
                {
                    transform: `translateY(calc(${sign}${Math.abs(this.currentX)}px ${sign} 1rem))`,
                    opacity: '0'
                }
            ], this.animationOptions).onfinish = () => {
                notification.remove();
            };
        } else {
            notification.animate([
                {
                    transform: this.currentX ? `translateX(${this.currentX}px)` : `none`,
                    opacity: '1'
                },
                {
                    transform: `translateX(calc(${sign}${Math.abs(this.currentX)}px ${sign} 1rem))`,
                    opacity: '0'
                }
            ], this.animationOptions).onfinish = () => {
                notification.remove();
            };
        }
    }
    remove(id) {
        const notification = this.notificationPanel.querySelector(`#${id}`);
        if (!notification) return;
        this.removeNotification(notification);
    }

    clearAll() {
        Array.from(this.notificationPanel.children).forEach(child => {
            this.removeNotification(child);
        });
    }

    handleTouchMove(e) {
        this.currentX = e.touches[0].clientX - this.startX;
        this.currentTarget.style.transform = `translateX(${this.currentX}px)`;
    }

    handleOrientationChange(e) {
        this.isBigViewport = e.matches
        if (e.matches) {
            // landscape

        } else {
            // portrait
        }
    }
    connectedCallback() {

        this.handleOrientationChange(this.mediaQuery);

        this.mediaQuery.addEventListener('change', this.handleOrientationChange);
        this.notificationPanel.addEventListener('touchstart', e => {
            if (e.target.closest('.close')) {
                this.removeNotification(e.target.closest('.notification'));
            } else if (e.target.closest('.notification')) {
                this.swipeThreshold = e.target.closest('.notification').getBoundingClientRect().width / 2;
                this.currentTarget = e.target.closest('.notification');
                this.startTime = Date.now();
                this.startX = e.touches[0].clientX;
                this.startY = e.touches[0].clientY;
                this.notificationPanel.addEventListener('touchmove', this.handleTouchMove, { passive: true });
            }
        }, { passive: true });
        this.notificationPanel.addEventListener('touchend', e => {
            this.endX = e.changedTouches[0].clientX;
            this.endY = e.changedTouches[0].clientY;
            this.swipeDistance = Math.abs(this.endX - this.startX);
            this.swipeTime = Date.now() - this.startTime;
            if (this.endX > this.startX) {
                this.swipeDirection = 'right';
            } else {
                this.swipeDirection = 'left';
            }
            if (this.swipeTime < this.swipeTimeThreshold) {
                if (this.swipeDistance > 50)
                    this.removeNotification(this.currentTarget, this.swipeDirection);
            } else {
                if (this.swipeDistance > this.swipeThreshold) {
                    this.removeNotification(this.currentTarget, this.swipeDirection);
                } else {
                    this.currentTarget.animate([
                        {
                            transform: `translateX(${this.currentX}px)`,
                        },
                        {
                            transform: `none`,
                        },
                    ], this.animationOptions).onfinish = (e) => {
                        e.target.commitStyles()
                        e.target.cancel()
                    }
                }
            }
            this.notificationPanel.removeEventListener('touchmove', this.handleTouchMove)
            this.currentX = 0;
        });
    }
    disconnectedCallback() {
        mediaQueryList.removeEventListener('change', handleOrientationChange);
    }
});