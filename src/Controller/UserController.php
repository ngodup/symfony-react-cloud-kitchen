<?php

namespace App\Controller;

use App\Entity\User;
//use App\Form\UserType; // Consider using a form for registration
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;


class UserController extends AbstractController
{
    // #[Route('/user', name: 'app_user')]
    // public function index(): Response
    // {
    //     return $this->render('user/index.html.twig', [
    //         'controller_name' => 'UserController',
    //     ]);
    // }

    private EntityManagerInterface $manager;
    private UserRepository $userRepository;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(EntityManagerInterface $manager, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher)
    {
        $this->manager = $manager;
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/register', name: 'register_user', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        // Consider using a form to handle validation and user input
        // $form = $this->createForm(UserType::class);
        // $form->handleRequest($request);

        // Extract data from request (assuming direct JSON)
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return new JsonResponse([
                'status' => false,
                'message' => 'Email and password are required'
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Check if the email already exists
        $emailExist = $this->userRepository->findOneByEmail($email);

        if ($emailExist) {
            return new JsonResponse([
                'status' => false,
                'message' => 'This email already exists, please change it'
            ], JsonResponse::HTTP_CONFLICT);
        } else {
            // Create new user with hashed password
            $user = new User();
            $user->setEmail($email);
            $user->setPassword($this->passwordHasher->hashPassword($user, $password));

            $this->manager->persist($user);
            $this->manager->flush();

            return new JsonResponse([
                'status' => true,
                'message' => 'The user has been created successfully'
            ], JsonResponse::HTTP_CREATED);
        }
    }
}
