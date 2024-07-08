import { isOneOf } from 'azos/strings';
import { html, parseRank, parseStatus } from '../ui.js';
import { AzosPart } from './part.js';
import { baseStyles, textInputStyles } from './styles.js';

/** Defines a text input/textarea component exposed as `az-text-input` tag */
export class TextInput extends AzosPart {
  static styles = [baseStyles, textInputStyles];

  static properties = {
    inputType: { type: String }, // 'input' or 'textarea'
    title: { type: String },
    placeholder: { type: String },
    value: { type: String }
  };

  constructor() {
    super();
    this.inputType = 'input'; // default to input
    this.title = '';
    this.placeholder = '';
    this.value = '';
  }

  /** True if the input type is simple text box instead of textarea */
  get isInputText() { return !this.isTextarea;}

  /** True if the input type is textarea instead of simple text box */
  get isTextarea(){  return this.inputType === 'textarea';}

  renderPart() {
    const clsRank =   `${parseRank(this.rank, true)}`;
    const clsBgColor = `${parseStatus(this.status, true, "Bg")}`;
    const clsTxtColor = `${parseStatus(this.status, true, "Txt")}`;
    const disableClass = `${this.isDisabled ? 'disabled' : ''}`;

    const inputElement = html`${this.isTextarea
      ? html`
        <textarea id="${this.id}" class="${clsRank} ${clsBgColor} ${clsTxtColor}" placeholder="${this.placeholder}" .disabled=${this.isDisabled}>${this.value}</textarea>
      ` : html`
        <input type="text" id="${this.id}" class="${clsRank} ${clsBgColor} ${clsTxtColor}" placeholder="${this.placeholder}" .value="${this.value}" .disabled=${this.isDisabled} />
      `
    }`;

    return html`
      <div class="${disableClass}">
        <label for="${this.id}" class="${clsRank} ${clsTxtColor}">${this.title}</label>
        ${inputElement}
      </div>
    `;
  }
}

window.customElements.define('az-text-input', TextInput);
