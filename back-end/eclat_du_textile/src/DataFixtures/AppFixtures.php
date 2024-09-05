<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{

    public function __construct(private UserPasswordHasherInterface $hasher){}

    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        $count = 20;

        $faker = \Faker\Factory::create("fr_FR");

        $user = new User();
        $user->setEmail("arnaudadmin@mail.com")
        ->setRoles(["ROLE_ADMIN"])
        ->setPassword($this->hasher->hashPassword($user, "admin"))
        ->setFirstName("Arnaud")
        ->setLastName("Colombe")
        ->setPhone("0715489625");

        $manager->persist($user);

        for ($i = 0; $i<$count; $i++){
            $multiple_user = new User();
            $multiple_user->setEmail($faker->email());
            $multiple_user->setPassword($this->hasher->hashPassword($multiple_user, $faker->password(10)));
            $multiple_user->setFirstName($faker->firstName());
            $multiple_user->setLastName($faker->lastName());
            $multiple_user->setPhone($faker->e164PhoneNumber());

            $manager->persist($multiple_user);
        }

        $manager->flush();
    }
}
