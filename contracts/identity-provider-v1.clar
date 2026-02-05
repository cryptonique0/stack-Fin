
;; identity-provider-v1
;; Decentralized Identity Registry for StackFarm Users.
;;
;; This contract allows users to register a profile and store "public" metadata on-chain.
;; It acts as the source of truth for the frontend Profile Dashboard.

;; Error Codes
(define-constant err-not-authorized (err u100))
(define-constant err-metadata-too-long (err u101))
(define-constant err-profile-exists (err u102))

;; Data Map: Principal -> Profile Data
(define-map profiles principal {
    nickname: (string-ascii 64),
    bio: (string-ascii 256),
    avatar-url: (string-ascii 256),
    created-at: uint
})

;; Getter: Fetch profile
(define-read-only (get-profile (user principal))
    (map-get? profiles user)
)

;; Public: Update or Create Profile
(define-public (update-profile (nickname (string-ascii 64)) (bio (string-ascii 256)) (avatar-url (string-ascii 256)))
    (begin
        ;; Simple validation: nickname shouldn't be empty
        (asserts! (> (len nickname) u0) err-metadata-too-long) 

        (map-set profiles tx-sender {
            nickname: nickname,
            bio: bio,
            avatar-url: avatar-url,
            created-at: block-height
        })
        
        (print {
            event: "profile-updated",
            user: tx-sender,
            nickname: nickname
        })
        
        (ok true)
    )
)
