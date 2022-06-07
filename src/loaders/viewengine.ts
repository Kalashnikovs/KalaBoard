import { ViewManager } from '../core/ViewManager';

function setViewVariables() {
    ViewManager.setVariables('global', {
        siteUrl: 'https://kalashnikovs.org',
        siteTitle: 'KalaBoard',
        pageTitle: 'Untitled',
        author: 'Kalashnikov',
        description: 'Forum Software',
    });

    ViewManager.setVariables('routes', {
        homeRoute: '/',
        adminRoute: '/admin',
        tosRoute: '/tos',
        privacyRoute: '/privacypolicy',
        rulesRoute: '/forumrules',
        loginRoute: '/auth/login',
        registerRoute: '/auth/register',
        passwordResetRoute: '/auth/reset',
    });

    ViewManager.setVariables('/', {});

    ViewManager.setVariables('/auth/register', {
        pageTitle: 'Register',
    });

    ViewManager.setVariables('/auth/login', {
        pageTitle: 'Login',
    });

    ViewManager.setVariables('/admin', {
        pageTitle: 'Admin',
    });
}

export function LoadViewEngineConfig(): void {
    ViewManager.set('views', 'views');
    ViewManager.set('view engine', 'ejs');
    ViewManager.set('theme', 'default');

    setViewVariables();
}
