import {FormControl} from "@angular/forms";

export function validateUrl(ctrl: FormControl) {
  let urlValue = ctrl.value;
  let valid = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(urlValue);
  if (urlValue.length === 0) {
    valid = true;
  }
  return valid ? null : {validUrl: {valid: false}};
}
