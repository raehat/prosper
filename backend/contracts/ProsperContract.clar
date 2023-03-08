
;; ProsperContract
;; This is Smart Contract for my Project Prosper

(define-constant ERR_LENGTH_MAX_REACHED (err u200))

(define-data-var patient-data 
    {
        name: (string-ascii 30) ,
        phone-no : uint,
        blood-group : (string-ascii 5),
        treatment-count : uint
    } 
    {
        name: "" ,
        phone-no : u0,
        blood-group : "",
        treatment-count : u0
    }
)

;; constants
(define-map patient
    principal 
    { 
        name: (string-ascii 30) ,
        phone-no : uint,
        blood-group : (string-ascii 5),
        treatment-count : uint
})

(define-map patient-treatment-id principal (list 100 uint))
(define-map patient-doctors principal (list 100 principal))

(define-map isDoctor principal bool)
(define-map isPatient principal bool)

(define-data-var temp-list (list 100 principal) (list ))
(define-data-var temp-list-2 (list 100 principal) (list ))

;; (define-map patient-info { id: uint } { patient-address : principal })
;; (define-map address-to-id { patient-address: principal } { id : uint })

;; (define-data-var ids (list 100 uint) (list ))

(define-map doctor
    principal
    { 
        name : (string-ascii 30),
        practice-type : (string-ascii 50),
        area-of-expertise : (string-ascii 50),
        phone-no : uint
})  

(define-map doctor-patients principal (list 100 principal))

(define-map treatment 
    uint
    { 
        patient-principal: principal,
        doctor-principal : principal,
        diagnosis : (string-ascii 100),
        medicine : (string-ascii 100),
        bill : uint,
        paid-patient-side : bool,  ;; confirmation by patient that they paid
        paid-doctor-side : bool, ;; confirmation by doctor that they received payment
})

(define-data-var total-treatment-count uint u0)

;; data maps and vars
;;

;; private functions
(define-read-only (addressDoesntExist (address principal)) 
    (if (and (is-eq (map-get? isDoctor tx-sender) none) (is-eq (map-get? isPatient tx-sender) none))
        true
        false
    )
)

(define-read-only (doctorExists (address principal))
    (if (is-eq (map-get? isDoctor address) none) false true)
)

(define-read-only (patientExists (address principal))
    (if (is-eq (map-get? isPatient address) none) false true)
)

;; public functions
(define-public
        (add-patient-info 
            (name- (string-ascii 30)) (phone-no- uint) (blood-group- (string-ascii 5))) 
        (begin  
        (asserts! (addressDoesntExist tx-sender) (err "Address already in use"))
            (map-set patient tx-sender {
                name: name-,
                phone-no : phone-no-,
                blood-group : blood-group-,
                treatment-count : u0
            })
            (map-set patient-doctors tx-sender (list ))
            (map-set patient-treatment-id tx-sender (list ))
            (map-set isPatient tx-sender true)
            (ok true)
        )
)



(define-read-only (get-patient-info (address principal)) 
    (map-get? patient address)
)

(define-read-only (get-patient-treatment-id (address principal))
    (map-get? patient-treatment-id address)
)

;; (define-read-only (addressExistsFun (address principal)) 
;;     (if (and (is-eq (map-get? isDoctor tx-sender) none) (is-eq (map-get? isPatient tx-sender) none))
;;         false
;;         true
;;     )
;; )

;; (define-public (add-doctor-patient (address-of-doctor principal)) 

;; )

(define-public
    (add-doctor 
        (name- (string-ascii 30)) (practice-type- (string-ascii 50)) (area-of-expertise- (string-ascii 50) )
        (phone-no- uint))
        (begin 
        (asserts! (addressDoesntExist tx-sender) (err "Address already in use!"))
        (map-set doctor tx-sender 
            {
                name : name-,
                practice-type : practice-type-,
                area-of-expertise : area-of-expertise-,
                phone-no : phone-no-
            }
        )
        (map-set doctor-patients tx-sender (list ))
        (map-set isDoctor tx-sender true)
        (ok true))
)

(define-read-only (get-doctor-info (address principal)) 
    (map-get? doctor address)
)

(define-map map-temp principal uint)

(define-public (assign-doctor-to-patient (address-of-doctor principal))
    ;; (asserts! (doctorExists address-of-doctor) (err "thrown"))
    (begin  
    ;; (define-data-var temp (list ) (map-get? patient-doctors tx-sender))
    ;; (define-data-var temp (list 100 principal) (unwrap-panic (map-get? patient-doctors tx-sender)))

    (var-set temp-list (unwrap-panic (map-get? patient-doctors tx-sender)))
    (append (var-get temp-list) address-of-doctor)
    (map-set patient-doctors tx-sender (unwrap-panic (as-max-len? (append (unwrap-panic (map-get? patient-doctors tx-sender)) address-of-doctor) u100)))
    (print (map-get? patient-doctors tx-sender))

    (var-set temp-list (unwrap-panic (map-get? doctor-patients address-of-doctor)))
    (append (var-get temp-list) tx-sender)
    ;; (map-set doctor-patients address-of-doctor (var-get temp-list))
    ;; (print (var-get temp-list))

    (ok true))
)

(define-public 
    (treat-patient 
        (address-of-patient principal) (diagnosis- (string-ascii 100)) (medicine- (string-ascii 100)) (bill- uint)
    ) 
    (begin 
    (asserts! (patientExists address-of-patient) (err "enter correct address of patient"))
    (asserts! (doctorExists tx-sender) (err "You're not a doctor!"))

    ;; Increment the treatment-count of the respective patient by 1
    (var-set patient-data (unwrap-panic (map-get? patient address-of-patient)))
    (var-set patient-data (merge (var-get patient-data) {treatment-count : (+ (get treatment-count (var-get patient-data)) u1)}))
    (map-set patient address-of-patient (var-get patient-data))
    (print (var-get patient-data))

    ;; add a new treatment tuple to treatment map
    (map-set treatment (var-get total-treatment-count) 
        {
            patient-principal: address-of-patient,
            doctor-principal : tx-sender,
            diagnosis : diagnosis-,
            medicine : medicine-,
            bill : bill-,
            paid-patient-side : false,
            paid-doctor-side : false
        }
    )

    ;; add treatment-id to patient data
    (map-set patient-treatment-id
        address-of-patient 
            (unwrap-panic 
                (as-max-len? 
                    (append 
                        (unwrap-panic 
                            (map-get? patient-treatment-id address-of-patient)) 
                        (var-get total-treatment-count)) 
                    u100
    )))

    (print (map-get? patient-treatment-id address-of-patient))

    ;; increment total-treatment-count 
    (var-set total-treatment-count (+ (var-get total-treatment-count) u1))

        (ok true)
    ))

(define-read-only (payment-status-patient (treatment-id uint))
    (get paid-patient-side (map-get? treatment treatment-id))
)

(define-read-only (payment-status-doctor (treatment-id uint))
    (get paid-doctor-side (map-get? treatment treatment-id))
)

(define-public (paid-by-patient (treatment-id uint)) 
    (begin 
    (map-set treatment treatment-id (merge (unwrap-panic (map-get? treatment treatment-id)) {paid-patient-side : true}))
    (ok true))
)

(define-public (paid-by-doctor (treatment-id uint)) 
    (begin 
    (map-set treatment treatment-id (merge (unwrap-panic (map-get? treatment treatment-id)) {paid-doctor-side : true})) 
    (ok true))
)

(define-read-only (get-treatment-details (treatment-id uint)) 
    (map-get? treatment treatment-id)
)

(define-read-only (get-doctors-assigned-to-patient (address principal)) 
    (map-get? patient-doctors address)
)

(define-read-only (get-patients-assigned-to-doctor (address principal)) 
    (map-get? doctor-patients address)
)


