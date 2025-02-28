import { provideRouter, Routes, withInMemoryScrolling } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ServiceProvisionResponseComponent } from './service-provision/service-provision.component';
import { ServiceProvisionResponseItemComponent } from './service-provision-item/service-provision-item.component';
import { ProfileComponent } from './profil/profil.component';
import { CartShopComponent } from './cart-shop/cart-shop.component';
import { ContactComponent } from './contact/contact.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { GeneralConditionsOfSaleComponent } from './general-conditions-of-sale/general-conditions-of-sale.component';
import { CancellationPolicyComponent } from './cancellation-policy/cancellation-policy.component';

export const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "nos_prestations", component: ServiceProvisionResponseComponent },
  { path: "nos_prestations/:id", component: ServiceProvisionResponseItemComponent },
  { path: "profil", component: ProfileComponent, canActivate: [authGuard] },
  { path: "commande", component: CartShopComponent, canActivate: [authGuard], data: { showHeader: false } },
  { path: "contact", component: ContactComponent },
  { path: "a_propos", component: AProposComponent },
  { path: "mentions_legales", component: LegalNoticeComponent },
  { path: "politique_de_confidentialite", component: PrivacyPolicyComponent },
  { path: "conditions_générales_de_vente", component: GeneralConditionsOfSaleComponent },
  { path: "politique_d_annulation", component: CancellationPolicyComponent },
  { path: "**", redirectTo: "" }
];

export const appRouterProviders = [
  provideRouter(
    routes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
    }),
  ),
];