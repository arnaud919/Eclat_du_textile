<?php

namespace App\Controller\Admin;

use App\Entity\Customer;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class CustomerCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Customer::class;
    }
    public function configureFields(string $pageName): iterable
    {
        return [
            yield IdField::new('id')
                ->onlyOnIndex(),
            yield DateField::new('date_inscription_customer'),
            yield EmailField::new('email'),
            yield TextField::new('first_name'),
            yield TextField::new('last_name'),
            yield ArrayField::new('roles'),
            yield TextField::new('phone'),
        ];
    }
}
