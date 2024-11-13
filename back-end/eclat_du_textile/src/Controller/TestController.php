<?php

namespace App\Controller;

use App\Entity\Customer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;

class TestController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['GET', 'POST'])]
    public function registerCustomer(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): Response
    {
        if ($request->isMethod('POST')) {
            // Récupérer les données du formulaire
            $email = $request->request->get('email');
            $password = $request->request->get('password');
            $first_name = $request->request->get('first_name');
            $last_name = $request->request->get('last_name');

            // Créer un nouveau Customer
            $customer = new Customer();
            $customer
                ->setEmail($email)
                ->setFirstName($first_name)
                ->setLastName($last_name);

            // Hacher le mot de passe
            $hashedPassword = $passwordHasher->hashPassword($customer, $password);
            $customer->setPassword($hashedPassword);

            // Persister l'entité en base de données
            $entityManager->persist($customer);
            $entityManager->flush();

            // Redirection ou réponse
            return new RedirectResponse($this->generateUrl('success_page'));
        }

        // Afficher le formulaire d'inscription
        return $this->render('test/register.html.twig');
    }

    #[Route('/success', name: 'success_page')]
    public function successPage(): Response
    {
        return $this->render('test/success.html.twig');
    }
}
