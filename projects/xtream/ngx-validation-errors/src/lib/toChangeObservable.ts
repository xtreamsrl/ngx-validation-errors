import {AbstractControl} from '@angular/forms';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, mergeAll, tap} from 'rxjs/operators';

function wrapMethod(subject$: Subject<void>, name: string, control: AbstractControl) {

  const prevMethod = control[name];

  function wrappedMethod(...args: any) {
    prevMethod.bind(control)(...args);
    subject$.next();
  }

  control[name] = wrappedMethod;
}

export function toChangeObservable(control: AbstractControl): Observable<void> {

  const touchedChanges$ = new Subject<void>();

  wrapMethod(touchedChanges$, 'markAsTouched', control);
  wrapMethod(touchedChanges$, 'markAsUntouched', control);
  wrapMethod(touchedChanges$, 'markAsDirty', control);
  wrapMethod(touchedChanges$, 'markAsPristine', control);

  const obs = merge(touchedChanges$, control.statusChanges);

  return obs.pipe(
    debounceTime(100)
  );
}
