import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { copyOutline } from 'ionicons/icons';
import ms from 'ms';

import { AlertDialogParams } from './interfaces/interfaces';

@Component({
  imports: [
    ClipboardModule,
    IonIcon,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'gf-alert-dialog',
  styleUrls: ['./alert-dialog.scss'],
  templateUrl: './alert-dialog.html'
})
export class GfAlertDialogComponent {
  public bodyText?: string;
  public copyConfirmationText?: string;
  public copyText?: string;
  public discardLabel: string;
  public message?: string;
  public title: string;

  protected readonly dialogRef =
    inject<MatDialogRef<GfAlertDialogComponent>>(MatDialogRef);

  private readonly clipboard = inject(Clipboard);
  private readonly snackBar = inject(MatSnackBar);

  public constructor() {
    addIcons({
      copyOutline
    });
  }

  public initialize({
    bodyText,
    copyConfirmationText,
    copyText,
    discardLabel,
    message,
    title
  }: AlertDialogParams) {
    this.bodyText = bodyText;
    this.copyConfirmationText = copyConfirmationText;
    this.copyText = copyText;
    this.discardLabel = discardLabel;
    this.message = message;
    this.title = title;
  }

  protected onCopyToClipboard() {
    if (!this.copyText) {
      return;
    }

    this.clipboard.copy(this.copyText);

    const valueStr = $localize`:@@6555318547274416232:Value`;
    const defaultMessage = $localize`${valueStr} has been copied to the clipboard`;

    this.snackBar.open(
      '✅ ' + (this.copyConfirmationText ?? defaultMessage),
      undefined,
      {
        duration: ms('3 seconds')
      }
    );
  }
}
