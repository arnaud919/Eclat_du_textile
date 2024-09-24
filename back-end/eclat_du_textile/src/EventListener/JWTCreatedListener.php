<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener(event:"lexik_jwt_authentication.on_jwt_created", method: "onJWTCreated")]
final class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        // Récupérer les données du payload
        $payload = $event->getData();

        /** @var \App\Entity\User $user */
        $user = $event->getUser();

        // Ajouter l'ID de l'utilisateur au payload
        $payload['id'] = $user->getId();
        $payload['first_name'] = $user->getFirstName();
        $payload['last_name'] = $user->getLastName();

        // Mettre à jour les données du token
        $event->setData($payload);
    }
} 