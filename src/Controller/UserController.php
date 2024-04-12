<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\UserProfile;
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
    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
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
        $userRepository = $entityManager->getRepository(User::class);
        $emailExist = $userRepository->findOneBy(['email' => $email]);

        if ($emailExist) {
            return new JsonResponse([
                'status' => false,
                'message' => 'This email already exists, please use a different one'
            ], JsonResponse::HTTP_CONFLICT);
        }

        // Create new user with hashed password
        $user = new User();
        $user->setEmail($email);
        $user->setPassword($passwordHasher->hashPassword($user, $password));

        // Create user profile and link it to the user
        $profile = new UserProfile();
        $profile->setUser($user); // Set the association

        // Optionally set other profile details if they exist in the request
        // Set profile details from the request, checking each for presence before setting
        if (isset($data['prenom'])) {
            $profile->setPrenom($data['prenom']);
        }
        if (isset($data['nom'])) {
            $profile->setNom($data['nom']);
        }
        if (isset($data['address'])) {
            $profile->setAddress($data['address']);
        }
        if (isset($data['ville'])) {
            $profile->setVille($data['ville']);
        }
        // Add more fields as necessary

        $entityManager->persist($user);
        $entityManager->persist($profile);
        $entityManager->flush();

        return new JsonResponse([
            'status' => true,
            'message' => 'User registration successful',
            'userId' => $user->getId(),  // Optionally return the user ID or other confirmation details
            'profileId' => $profile->getId() // Optionally return the profile ID
        ], JsonResponse::HTTP_CREATED);
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
