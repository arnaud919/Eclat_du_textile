<?php

namespace App\Controller\Admin;

use App\Entity\Item;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Faker\Core\Number;

class ItemCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Item::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            yield IdField::new('id')
                ->onlyOnIndex(),
            yield NumberField::new('category_article'),
            yield NumberField::new('type_material'),
            yield NumberField::new('color'),
            yield NumberField::new('service'),
            yield NumberField::new('quantity'),
            yield TextField::new('name_item'),
            yield NumberField::new('price_service'),
            yield NumberField::new('multiplier_price'),
        ];
    }
    
}
