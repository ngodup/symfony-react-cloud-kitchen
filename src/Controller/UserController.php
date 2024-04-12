<?php

namespace App\Controller;

use App\Entity\User;
//use App\Form\UserType; // Consider using a form for registration
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

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

    #[Route('/api/me', name: 'api_user_profile', methods: ['GET'])]
    public function userProfile(TokenStorageInterface $tokenStorage): JsonResponse
    {
        $token = $tokenStorage->getToken();
        if (null === $token) {
            return $this->json(['message' => 'No authentication token found.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $user = $token->getUser();

        // Check if the user is an instance of your User entity
        if (!$user instanceof User) {  // Use your User entity class here
            return $this->json(['message' => 'Token does not contain a valid user.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        // Now it's safe to call User-specific methods like getId and getEmail
        return $this->json([
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
            ]
        ]);
    }
}
