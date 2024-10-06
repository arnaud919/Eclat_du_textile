<?php

namespace App\Controller\Admin;

use App\Entity\CategoryArticle;
use App\Entity\Color;
use App\Entity\Customer;
use App\Entity\CustomerOrder;
use App\Entity\Employee;
use App\Entity\Item;
use App\Entity\Job;
use App\Entity\Service;
use App\Entity\TypeMaterial;
use App\Entity\User;
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
        // return parent::index();

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
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
            ->setTitle('Eclat Du Textile');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Utilisateurs', 'fa fa-home');
        yield MenuItem::linkToCrud('Categories d\'article', 'fa fa-article', CategoryArticle::class);
        yield MenuItem::linkToCrud('Couleurs', 'fa fa-color', Color::class);
        yield MenuItem::linkToCrud('Clients', 'fa fa-customer', Customer::class);
        yield MenuItem::linkToCrud('Commandes client', 'fa fa-customer-order', CustomerOrder::class);
        yield MenuItem::linkToCrud('Employés', 'fa fa-employee', Employee::class);
        yield MenuItem::linkToCrud('Articles', 'fa fa-item', Item::class);
        yield MenuItem::linkToCrud('Tâches', 'fa fa-job', Job::class);
        yield MenuItem::linkToCrud('Services', 'fa fa-service', Service::class);
        yield MenuItem::linkToCrud('Type de tissu', 'fa fa-type-material', TypeMaterial::class);
    }
}
