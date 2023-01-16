interface Routes {
  signIn?: string;
  signUp?: string;
  profile?: string;
  cart?: string;
  payment?: string;
  createCard?: string;
  createBillExchange?: string;
  purchaseConfirmation?: string;
  billet?: string;
  home?: string;
  homeSections?: {
    events?: string;
    markets?: string;
  };
  search?: string;
  billet?: string;
  billet?: string;
  billet?: string;
}

const routes: Routes = {};
routes.signIn = '/login';
routes.signUp = '/cadastro';
routes.profile = '/perfil';

routes.cart = '/carrinho';
routes.payment = `${routes.cart}/pagamento`;
routes.createCard = `${routes.payment}/cartao`;
routes.createBillExchange = `${routes.payment}/boleto`;
routes.purchaseConfirmation = `${routes.cart}/confirmacao`;
routes.billet = `${routes.cart}/boleto`;

routes.home = '/';
routes.homeSections = {};
routes.homeSections.events = '/#eventos';
routes.homeSections.markets = '/#commerce';

routes.search = '/busca';
routes.toSearch = ({ category, show, search }) =>
  `/busca?category=${category}&show=${show}&search=${search}`;
routes.event = '/evento/:id';
routes.getEvent = (id) => `/evento/${id}`;

routes.markets = '/comercio';
routes.marketsSections = {};
routes.marketsSections.accommodation = '/comercio#acomodacao';
routes.marketsSections.food = '/comercio#alimentacao';
routes.marketsSections.crafts = '/comercio#artesanato';
routes.marketsSections.tour = '/comercio#passeio';

routes.subsidiary = `${routes.markets}/empresa/:id`;
routes.getSubsidiary = (id) => `${routes.markets}/empresa/${id}`;

routes.menu = `${routes.subsidiary}/menu`;
routes.getMenu = (subsidiary) => `${routes.getSubsidiary(subsidiary)}/menu`;

routes.admin = {};

routes.admin.subsidiary = {};
routes.admin.subsidiary.panel = '/administrar/filial';
routes.admin.subsidiary.events = `${routes.admin.subsidiary.panel}/eventos`;
routes.admin.subsidiary.menu = `${routes.admin.subsidiary.panel}/menu`;
routes.admin.subsidiary.products = `${routes.admin.subsidiary.panel}/produtos`;
routes.admin.subsidiary.promotions = `${routes.admin.subsidiary.panel}/promocoes`;
routes.admin.subsidiary.services = `${routes.admin.subsidiary.panel}/servicos`;

routes.admin.company = {};
routes.admin.company.panel = '/administrar/empresa';
routes.admin.company.subsidiaries = `${routes.admin.company.panel}/filiais`;
routes.admin.company.events = `${routes.admin.company.panel}/eventos`;

routes.admin.cooperative = {};
routes.admin.cooperative.panel = '/administrar/cooperativa';
routes.admin.cooperative.companies = `${routes.admin.cooperative.panel}/empresas`;
routes.admin.cooperative.events = `${routes.admin.cooperative.panel}/eventos`;

routes.testesAqui = '/_';
routes.docs = '/docs';

routes.back = {};
routes.back.api = 'https://api.ivoucherbook.site';
routes.back.cooperative = {
  list: '/cooperatives',
  get: (id) => `/cooperatives/${id}`,
  event: {
    list: (cooperativeId) => `/cooperatives/${cooperativeId}/events`,
  },
  company: {
    list: (cooperativeId) => `/cooperatives/${cooperativeId}/enterprises`,
  },
};
routes.back.company = {
  list: '/enterprises',
  get: (companyId) => `/enterprises/${companyId}`,
  event: {
    list: (companyId) => `/enterprises/${companyId}/events`,
  },
  company: {
    list: (companyId) => `/enterprises/${companyId}/branches`,
  },
};
routes.back.subsidiary = {
  list: '/branches',
  get: (subsidiaryId) => `/branches/${subsidiaryId}`,
  comment: {
    list: (subsidiaryId) => `/branches/${subsidiaryId}/commentaries`,
  },
  event: {
    list: (subsidiaryId) => `/branches/${subsidiaryId}/events`,
  },
  product: {
    list: (subsidiaryId) => `/branches/${subsidiaryId}/products`,
  },
  promotion: {
    list: '/promotions',
    get: (promotionId) => `/promotions/${promotionId}`,
  },
  service: {
    list: '/services',
    get: (serviceId) => `/services/${serviceId}`,
  },
};
routes.back.user = {
  create: '/users',
  list: '/users',
  get: (uid) => `/users/${uid}`,
};
routes.back.purchase = {
  create: '/purchases',
  list: '/purchases',
  product: {
    list: ({ purchaseId }) => `/purchases/${purchaseId}/products`,
    create: ({ purchaseId }) => `/purchases/${purchaseId}/products`,
    update: ({ purchaseId, productId }) =>
      `/purchases/${purchaseId}/products/${productId}`,
    delete: ({ purchaseId, productId }) =>
      `/purchases/${purchaseId}/products/${productId}`,
  },
  get: (purchaseId) => `/purchases/${purchaseId}`,
};
routes.back.product = {
  list: '/products',
  get: (productId) => `/products/${productId}`,
  create: '/products',
};
routes.back.service = {
  list: '/services',
  get: (serviceId) => `/services/${serviceId}`,
  create: '/services',
};
routes.back.media = {
  get: (mediaId) => `/midias/${mediaId}`,
  getUrl: (mediaId) => `${routes.back.api}/midias/${mediaId}`,
  create: '/midias',
};

routes.back.event = {
  list: (month) => `/events?month=${month}`,
  get: (id) => `/events/${id}`,
};

export default routes;
