<?php

namespace App\Doctrine;

use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{

    /**
     * @var Security
     */
    private $security;

    /**
     * @var AuthorizationCheckerInterface
     */
    private $checker;

    public function __construct(Security $security, AuthorizationCheckerInterface $chercker)
    {
        $this->security = $security;
        $this->checker = $chercker;
    }

    private function andWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        $user = $this->security->getUser();
        if (
            ($resourceClass === Customer::class || $resourceClass === Invoice::class) 
            && !$this->checker->isGranted('ROLE_ADMIN') 
            && $user instanceof User){
            $rootAlias = $queryBuilder->getRootAliases()[0];

            if($resourceClass === Customer::class){
                $queryBuilder->andWhere("$rootAlias.user = :user");

            } else if($resourceClass === Invoice::class){
                $queryBuilder->join("$rootAlias.customer", "c")
                             ->andWhere("c.user = :user");
            }
            $queryBuilder->setParameter("user", $user);
        }

    }
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
        $this->andWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        $this->andWhere($queryBuilder, $resourceClass);
    }
}
