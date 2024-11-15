<?php

namespace App\Controller\Admin;

use App\Entity\CategoryArticle;
use App\Entity\Color;
use App\Entity\Customer;
use App\Entity\CustomerOrder;
use App\Entity\Employee;
use App\Entity\Item;
use App\Entity\Service;
use App\Entity\TypeMaterial;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // Option 1. You can make your dashboard redirect to some common page of your backend

        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(UserCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Eclat du textile');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Utilisateur', 'fa fa-home');
        yield MenuItem::linkToCrud('Categorie d\'article', null, CategoryArticle::class);
        yield MenuItem::linkToCrud('Couleur', null, Color::class);
        yield MenuItem::linkToCrud('Client', null, Customer::class);
        yield MenuItem::linkToCrud('Commande de client', null, CustomerOrder::class);
        yield MenuItem::linkToCrud('Employée', null, Employee::class);
        yield MenuItem::linkToCrud('Article Panier', null, Item::class);
        yield MenuItem::linkToCrud('Service', null, Service::class);
        yield MenuItem::linkToCrud('Type de materiau', null, TypeMaterial::class);
    }
}
