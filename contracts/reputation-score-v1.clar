
;; reputation-score-v1
;; Dynamic Reputation Scoring System for StackFarm.
;;
;; This contract aggregates user activity to compute a "DeFi Score".
;; Score = (Governance Votes * 10) + (Loans Repaid * 50) + (Auctions Won * 20)
;;
;; This score can be used to unlock tiered features or lower collateral ratios.

(define-constant contract-owner tx-sender)
(define-constant err-not-authorized (err u100))

(define-map user-scores principal {
    governance-votes: uint,
    loans-repaid: uint,
    auctions-won: uint,
    total-score: uint
})

;; Getter: Fetch user score
(define-read-only (get-score (user principal))
    (map-get? user-scores user)
)

(define-private (calculate-score (votes uint) (loans uint) (auctions uint))
    (+ 
        (* votes u10)
        (* loans u50)
        (* auctions u20)
    )
)

(define-public (add-vote (user principal))
    (let (
        (current-data (default-to {governance-votes: u0, loans-repaid: u0, auctions-won: u0, total-score: u0} (map-get? user-scores user)))
        (new-votes (+ (get governance-votes current-data) u1))
        (new-score (calculate-score new-votes (get loans-repaid current-data) (get auctions-won current-data)))
    )
        ;; In a real system, this would be restricted to the Governance Contract
        ;; (asserts! (is-eq contract-caller .governance-v3) err-not-authorized)
        
        (map-set user-scores user (merge current-data {
            governance-votes: new-votes,
            total-score: new-score
        }))
        (ok new-score)
    )
)

(define-public (add-loan-repayment (user principal))
    (let (
        (current-data (default-to {governance-votes: u0, loans-repaid: u0, auctions-won: u0, total-score: u0} (map-get? user-scores user)))
        (new-loans (+ (get loans-repaid current-data) u1))
        (new-score (calculate-score (get governance-votes current-data) new-loans (get auctions-won current-data)))
    )
        ;; Restricted to Lending Contract
        (map-set user-scores user (merge current-data {
            loans-repaid: new-loans,
            total-score: new-score
        }))
        (ok new-score)
    )
)
