<?php

namespace App\Controller\Admin;

use App\Entity\CategoryArticle;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class CategoryArticleCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return CategoryArticle::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            yield IdField::new('id')
                ->onlyOnIndex(),
            yield TextField::new('name_category_article'),
            yield NumberField::new('multiplier_price')->setNumDecimals(2)
        ];
    }
}
