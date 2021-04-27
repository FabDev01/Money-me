import { redirectLoggedInTo } from '@angular/fire/auth-guard';

export const redirectLoggedInUsers = () => redirectLoggedInTo(['/tabs/tab1']);
