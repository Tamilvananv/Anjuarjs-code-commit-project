import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AbstractControl, FormArray, FormGroup, FormControl } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class FormErrorDisplayService {
    getValidatorErrorMessage(validatorName: string, fieldName: string, validatorValue?: any) {
        let config = {
            'required': fieldName + ' is required',
            'email': 'The ' + validatorName + ' must contain a valid email address',
            'invalidPassword': 'Password must be at least 6 characters long, and contain a number.',
            'minLength': `Minimum length ${validatorValue.requiredLength}`,
            'invalidMatch': 'The password and confirm password must match',
            'confirmedValidator':'asda'
        };
        return config[validatorName];
    }

    constructor(
        private toastr: ToastrService
    ) { }

    private getName(control: AbstractControl): string | null {
        let group = <FormGroup>control.parent;

        if (!group) {
            return null;
        }

        let name: string;

        Object.keys(group.controls).forEach(key => {
            let childControl = group.get(key);

            if (childControl !== control) {
                return;
            }

            name = key;
        });
        return name;
    }

    pascelstringToSentance (str) {
		if (str!=undefined) {
			str = str.replace(/([A-Z])/g, " $1");
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
	}

    showErrors(group: FormGroup | FormArray): void {
        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.controls[key] as FormControl;
            if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
                this.showErrors(abstractControl);
            } else {
                let focusSet = false;
                for (let propertyName in abstractControl.errors) {
                    if (abstractControl.errors.hasOwnProperty(propertyName)) {
                        const ctrlName = this.pascelstringToSentance(this.getName(abstractControl));
                        const msg = this.getValidatorErrorMessage(propertyName, ctrlName, abstractControl.errors[propertyName]);
                        this.toastr.error(msg);
                        if (!focusSet) {
                            focusSet = true;
                        }
                    };
                    abstractControl.markAsDirty();
                }
            }
        });
    }
}