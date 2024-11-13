<?php

namespace App\Controller;

use App\Entity\Customer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;

class RegisterCustomerController extends AbstractController
{

    private $entityManager;
    private $passwordHasher;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher)
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    public function registerUser(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        dump($data); // Vérifiez que toutes les données nécessaires sont bien reçues
        exit; // Ajoutez un exit pour voir le contenu de $data sans aller plus loin
    
        $user = new Customer(); // ou User selon votre entité
        
        // Assurez-vous de définir tous les champs nécessaires
        $user->setEmail($data['email'] ?? null);
        $user->setFirstName($data['first_name'] ?? null);
        $user->setLastName($data['last_name'] ?? null);
        $user->setPhone($data['phone'] ?? null);
    
        // Hachage du mot de passe
        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);
    
        try {
            // Sauvegarde dans la base de données
            $entityManager->persist($user);
            $entityManager->flush();
    
            return new JsonResponse(['status' => 'Utilisateur créé avec succès'], 201);
        } catch (\Exception $e) {
            // Capture les erreurs pour identifier les problèmes potentiels
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }    

    /**
     * Méthode de test pour vérifier l’enregistrement simplifié avec hachage
     */
    public function registerCustomerSimple(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = new Customer(); // Crée un utilisateur de test
        $user->setEmail($data['email']);
        $user->setFirstName($data['first_name']);
        $user->setLastName($data['last_name']);
        $user->setPhone($data['phone'] ?? null);

        try {
            // Hachage du mot de passe et sauvegarde dans la base
            $hashedPassword = $this->passwordHasher->hashPassword($user, $data['password']);
            $user->setPassword($hashedPassword);

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return new JsonResponse(['status' => 'Utilisateur créé avec succès'], 201);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }
}
