<?php

namespace App\Controller\Admin;

use App\Entity\TypeMaterial;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class TypeMaterialCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return TypeMaterial::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            yield IdField::new('id')
                ->onlyOnIndex(),
            yield TextField::new('name_type_material'),
        ];
    }
    
}
