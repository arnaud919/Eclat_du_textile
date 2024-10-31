<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Employee;
use App\Entity\Customer;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{

    public function __construct(private UserPasswordHasherInterface $hasher){}

    public function load(ObjectManager $manager): void
    {

        $count = 20;

        $faker = \Faker\Factory::create("fr_FR");

        $employee = new Employee();

        $employee->setEmail("arnaudadmin@mail.com")
        ->setRoles(["ROLE_ADMIN"])
        ->setPassword($this->hasher->hashPassword($employee, "admin"))
        ->setFirstName("Arnaud")
        ->setLastName("Colombe")
        ->setPhone("0715489625")
        ->setHiringDate(\DateTime::createFromFormat('Y-m-d', date('Y-m-d')))
        ->setAdressEmployee("1 Rue Emploi")
        ->setPostalCode('69000');

        $birthday = new \DateTime('05-11-2000');

        $employee->setBirthday($birthday);

        $manager->persist($employee);

        for ($i = 0; $i<$count; $i++){
            $multiple_customer = new Customer();
            $multiple_customer->setEmail($faker->email());
            $multiple_customer->setPassword($this->hasher->hashPassword($multiple_customer, $faker->password(10)));
            $multiple_customer->setFirstName($faker->firstName());
            $multiple_customer->setLastName($faker->lastName());
            $multiple_customer->setPhone($faker->e164PhoneNumber());
            $multiple_customer->setDateInscriptionCustomer(\DateTime::createFromFormat('Y-m-d', date('Y-m-d')));

            $manager->persist($multiple_customer);
        }

        $manager->flush();
    }
}
