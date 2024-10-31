<?php

// src/Command/TestHashCommand.php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;

class TestHashCommand extends Command
{
    protected static $defaultName = 'app:test-hash';

    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        parent::__construct();
        $this->passwordHasher = $passwordHasher;
    }

    protected function configure(): void
    {
        $this
            ->setDescription('Test the password hashing functionality');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $user = new User();
        $plainPassword = 'test_password';
        $hashedPassword = $this->passwordHasher->hashPassword($user, $plainPassword);

        $output->writeln('Mot de passe haché : ' . $hashedPassword);

        return Command::SUCCESS;
    }
}
