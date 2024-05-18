import { Prisma } from "@prisma/client";
import { Socket } from "socket.io";
export declare const include: {
    users: true;
};
export type NotificationPrisma = Prisma.NotificationGetPayload<{
    include: typeof include;
}>;
export type NewNotification = Omit<NotificationPrisma, "id" | "viewed_by" | "datetime">;
export type NotificationKeyType = "employee" | "report" | "call" | "talhao" | "kit" | "tillage" | "admin" | "manager";
export type NotificationActionType = "close" | "approve" | "call" | "active" | "disabled" | "new" | "update";
export declare class NotificationClass {
    id: number;
    action: NotificationActionType;
    datetime: string;
    target_key: NotificationKeyType;
    target_id: number;
    viewed_by: number[];
    users: number[];
    data: any;
    constructor(data: NotificationPrisma, data2: any);
    static getData(id: number, key: NotificationKeyType): Promise<{
        kits: {
            calls: {
                talhao: {
                    cover: string;
                    id: number;
                    name: string;
                    area: number;
                    tillageId: number;
                };
                kit: {
                    id: number;
                    image: string | null;
                    name: string;
                    description: string;
                    active: boolean;
                    hectareDay: number;
                    equipment: string | null;
                    model: string | null;
                } | null;
                producer: {
                    user: {
                        id: number;
                        name: string;
                        cpf: string;
                        birth: string;
                        phone: string;
                        image: string | null;
                        username: string;
                        email: string;
                        password: string;
                        isAdmin: boolean;
                        isManager: boolean;
                        approved: boolean;
                        rejected: string | null;
                        office: string;
                    };
                } & {
                    id: number;
                    cnpj: string;
                    contract: boolean;
                    inscricaoEstadual: string;
                    userid: number;
                    employeeId: number | null;
                };
                id: number;
                forecast: string;
                open: string | null;
                init: string | null;
                finish: string | null;
                approved: boolean | null;
                comments: string | null;
                totalPrice: number | null;
                status: import(".prisma/client").$Enums.CallStatus;
                talhaoId: number;
                kitId: number | null;
                producerId: number;
                userId: number;
            }[];
            id: number;
            image: string | null;
            name: string;
            description: string;
            active: boolean;
            hectareDay: number;
            equipment: string | null;
            model: string | null;
        }[] | null;
        bank: {
            id: number;
            name: string;
            agency: string;
            type: string;
            account: string;
            employeeId: number;
        } | null;
        professional: {
            id: number;
            department: string | null;
            office: string;
            admission: string | null;
            salary: number | null;
            employeeId: number;
        } | null;
        calendars: {
            id: number;
            name: string;
            employeeId: number | null;
            kitId: number | null;
        }[];
        producers: ({
            user: {
                id: number;
                name: string;
                cpf: string;
                birth: string;
                phone: string;
                image: string | null;
                username: string;
                email: string;
                password: string;
                isAdmin: boolean;
                isManager: boolean;
                approved: boolean;
                rejected: string | null;
                office: string;
            };
        } & {
            id: number;
            cnpj: string;
            contract: boolean;
            inscricaoEstadual: string;
            userid: number;
            employeeId: number | null;
        })[];
        id: number;
        rg: string;
        gender: string;
        relationship: string;
        nationality: string;
        voter_card: string;
        work_card: string;
        military: string | null;
        residence: string;
        office: string;
        userid: number;
    } | {
        employee: {
            kits: {
                calls: {
                    talhao: {
                        cover: string;
                        id: number;
                        name: string;
                        area: number;
                        tillageId: number;
                    };
                    kit: {
                        id: number;
                        image: string | null;
                        name: string;
                        description: string;
                        active: boolean;
                        hectareDay: number;
                        equipment: string | null;
                        model: string | null;
                    } | null;
                    producer: {
                        user: {
                            id: number;
                            name: string;
                            cpf: string;
                            birth: string;
                            phone: string;
                            image: string | null;
                            username: string;
                            email: string;
                            password: string;
                            isAdmin: boolean;
                            isManager: boolean;
                            approved: boolean;
                            rejected: string | null;
                            office: string;
                        };
                    } & {
                        id: number;
                        cnpj: string;
                        contract: boolean;
                        inscricaoEstadual: string;
                        userid: number;
                        employeeId: number | null;
                    };
                    id: number;
                    forecast: string;
                    open: string | null;
                    init: string | null;
                    finish: string | null;
                    approved: boolean | null;
                    comments: string | null;
                    totalPrice: number | null;
                    status: import(".prisma/client").$Enums.CallStatus;
                    talhaoId: number;
                    kitId: number | null;
                    producerId: number;
                    userId: number;
                }[];
                id: number;
                image: string | null;
                name: string;
                description: string;
                active: boolean;
                hectareDay: number;
                equipment: string | null;
                model: string | null;
            }[] | null;
            bank: {
                id: number;
                name: string;
                agency: string;
                type: string;
                account: string;
                employeeId: number;
            } | null;
            professional: {
                id: number;
                department: string | null;
                office: string;
                admission: string | null;
                salary: number | null;
                employeeId: number;
            } | null;
            calendars: {
                id: number;
                name: string;
                employeeId: number | null;
                kitId: number | null;
            }[];
            producers: ({
                user: {
                    id: number;
                    name: string;
                    cpf: string;
                    birth: string;
                    phone: string;
                    image: string | null;
                    username: string;
                    email: string;
                    password: string;
                    isAdmin: boolean;
                    isManager: boolean;
                    approved: boolean;
                    rejected: string | null;
                    office: string;
                };
            } & {
                id: number;
                cnpj: string;
                contract: boolean;
                inscricaoEstadual: string;
                userid: number;
                employeeId: number | null;
            })[];
            id: number;
            rg: string;
            gender: string;
            relationship: string;
            nationality: string;
            voter_card: string;
            work_card: string;
            military: string | null;
            residence: string;
            office: string;
            userid: number;
        } | null;
        producer: {
            tillage: {
                cover: string;
                talhao: {
                    cover: string;
                    calls: {
                        id: number;
                        forecast: string;
                        open: string | null;
                        init: string | null;
                        finish: string | null;
                        approved: boolean | null;
                        comments: string | null;
                        totalPrice: number | null;
                        status: import(".prisma/client").$Enums.CallStatus;
                        talhaoId: number;
                        kitId: number | null;
                        producerId: number;
                        userId: number;
                    }[];
                    id: number;
                    name: string;
                    area: number;
                    tillageId: number;
                }[];
                address: {
                    id: number;
                    street: string;
                    district: string;
                    number: string;
                    cep: string;
                    city: string;
                    uf: string;
                    adjunct: string;
                    userId: number | null;
                    tillageId: number | null;
                } | null;
                location: {
                    id: number;
                    x: string;
                    y: string;
                    talhaoId: number | null;
                    tillageId: number | null;
                }[];
                gallery: {
                    id: number;
                    name: string | null;
                    talhaoId: number | null;
                    tillageId: number;
                }[];
                id: number;
                name: string;
                area: number;
                owner: string;
                ceo: string;
                manager: string | null;
                agronomist: string | null;
                technician: string | null;
                pilot: string | null;
                others: string | null;
                comments: string | null;
                hectarePrice: number | null;
                producerId: number;
            }[] | null;
            user: {
                id: number;
                name: string;
                cpf: string;
                birth: string;
                phone: string;
                image: string | null;
                username: string;
                email: string;
                password: string;
                isAdmin: boolean;
                isManager: boolean;
                approved: boolean;
                rejected: string | null;
                office: string;
            };
            id: number;
            cnpj: string;
            contract: boolean;
            inscricaoEstadual: string;
            userid: number;
            employeeId: number | null;
        } | null;
        address?: {
            id: number;
            street: string;
            district: string;
            number: string;
            cep: string;
            city: string;
            uf: string;
            adjunct: string;
            userId: number | null;
            tillageId: number | null;
        } | null | undefined;
        id?: number | undefined;
        name?: string | undefined;
        cpf?: string | undefined;
        birth?: string | undefined;
        phone?: string | undefined;
        image?: string | null | undefined;
        username?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
        isAdmin?: boolean | undefined;
        isManager?: boolean | undefined;
        approved?: boolean | undefined;
        rejected?: string | null | undefined;
        office?: string | undefined;
    } | {
        cover: string;
        talhao: {
            cover: string;
            tillage: {
                cover: string;
                address: {
                    id: number;
                    street: string;
                    district: string;
                    number: string;
                    cep: string;
                    city: string;
                    uf: string;
                    adjunct: string;
                    userId: number | null;
                    tillageId: number | null;
                } | null;
                id: number;
                name: string;
                area: number;
                owner: string;
                ceo: string;
                manager: string | null;
                agronomist: string | null;
                technician: string | null;
                pilot: string | null;
                others: string | null;
                comments: string | null;
                hectarePrice: number | null;
                producerId: number;
            };
            calls: ({
                kit: ({
                    employees: ({
                        user: {
                            id: number;
                            name: string;
                            cpf: string;
                            birth: string;
                            phone: string;
                            image: string | null;
                            username: string;
                            email: string;
                            password: string;
                            isAdmin: boolean;
                            isManager: boolean;
                            approved: boolean;
                            rejected: string | null;
                            office: string;
                        };
                    } & {
                        id: number;
                        rg: string;
                        gender: string;
                        relationship: string;
                        nationality: string;
                        voter_card: string;
                        work_card: string;
                        military: string | null;
                        residence: string;
                        office: string;
                        userid: number;
                    })[];
                } & {
                    id: number;
                    image: string | null;
                    name: string;
                    description: string;
                    active: boolean;
                    hectareDay: number;
                    equipment: string | null;
                    model: string | null;
                }) | null;
                producer: {
                    user: {
                        id: number;
                        name: string;
                        cpf: string;
                        birth: string;
                        phone: string;
                        image: string | null;
                        username: string;
                        email: string;
                        password: string;
                        isAdmin: boolean;
                        isManager: boolean;
                        approved: boolean;
                        rejected: string | null;
                        office: string;
                    };
                } & {
                    id: number;
                    cnpj: string;
                    contract: boolean;
                    inscricaoEstadual: string;
                    userid: number;
                    employeeId: number | null;
                };
                reports: ({
                    operation: {
                        id: number;
                        service: string;
                        culture: string;
                        areaMap: number;
                        equipment: string;
                        model: string;
                        reportId: number;
                    } | null;
                    material: {
                        id: number;
                        talhao: string;
                        area: number;
                        product: string;
                        dosage: string;
                        classification: string;
                        total: string;
                        removed: string;
                        applied: string;
                        returned: string;
                        comments: string;
                        reportId: number;
                    }[];
                    techReport: {
                        id: number;
                        date: string;
                        init: string;
                        finish: string;
                        comments: string;
                        reportId: number;
                    } | null;
                    treatment: ({
                        products: {
                            id: number;
                            name: string;
                            dosage: string;
                            treatmentId: number;
                        }[];
                    } & {
                        id: number;
                        reportId: number;
                    }) | null;
                    call: {
                        id: number;
                        forecast: string;
                        open: string | null;
                        init: string | null;
                        finish: string | null;
                        approved: boolean | null;
                        comments: string | null;
                        totalPrice: number | null;
                        status: import(".prisma/client").$Enums.CallStatus;
                        talhaoId: number;
                        kitId: number | null;
                        producerId: number;
                        userId: number;
                    };
                    stages: {
                        id: number;
                        name: string | null;
                        date: string | null;
                        start: string | null;
                        finish: string | null;
                        duration: string | null;
                        comments: string | null;
                        reportId: number;
                    }[];
                } & {
                    id: number;
                    areaTrabalhada: number;
                    date: string | null;
                    hour: string | null;
                    close: string | null;
                    approved: boolean | null;
                    totalPrice: number | null;
                    pdf_path: string | null;
                    callId: number;
                    stage: number;
                })[];
            } & {
                id: number;
                forecast: string;
                open: string | null;
                init: string | null;
                finish: string | null;
                approved: boolean | null;
                comments: string | null;
                totalPrice: number | null;
                status: import(".prisma/client").$Enums.CallStatus;
                talhaoId: number;
                kitId: number | null;
                producerId: number;
                userId: number;
            })[];
            location: {
                id: number;
                x: string;
                y: string;
                talhaoId: number | null;
                tillageId: number | null;
            }[];
            gallery: {
                id: number;
                name: string | null;
                talhaoId: number | null;
                tillageId: number;
            }[];
            id: number;
            name: string;
            area: number;
            tillageId: number;
        }[];
        producer: {
            user: {
                id: number;
                name: string;
                cpf: string;
                birth: string;
                phone: string;
                image: string | null;
                username: string;
                email: string;
                password: string;
                isAdmin: boolean;
                isManager: boolean;
                approved: boolean;
                rejected: string | null;
                office: string;
            };
        } & {
            id: number;
            cnpj: string;
            contract: boolean;
            inscricaoEstadual: string;
            userid: number;
            employeeId: number | null;
        };
        address: {
            id: number;
            street: string;
            district: string;
            number: string;
            cep: string;
            city: string;
            uf: string;
            adjunct: string;
            userId: number | null;
            tillageId: number | null;
        } | null;
        location: {
            id: number;
            x: string;
            y: string;
            talhaoId: number | null;
            tillageId: number | null;
        }[];
        gallery: ({
            images: {
                id: number;
                url: string;
                galleryId: number;
            }[];
        } & {
            id: number;
            name: string | null;
            talhaoId: number | null;
            tillageId: number;
        })[];
        id: number;
        name: string;
        area: number;
        owner: string;
        ceo: string;
        manager: string | null;
        agronomist: string | null;
        technician: string | null;
        pilot: string | null;
        others: string | null;
        comments: string | null;
        hectarePrice: number | null;
        producerId: number;
    } | {
        calls: {
            talhao: {
                cover: string;
                id: number;
                name: string;
                area: number;
                tillageId: number;
            };
            kit: {
                id: number;
                image: string | null;
                name: string;
                description: string;
                active: boolean;
                hectareDay: number;
                equipment: string | null;
                model: string | null;
            } | null;
            producer: {
                user: {
                    id: number;
                    name: string;
                    cpf: string;
                    birth: string;
                    phone: string;
                    image: string | null;
                    username: string;
                    email: string;
                    password: string;
                    isAdmin: boolean;
                    isManager: boolean;
                    approved: boolean;
                    rejected: string | null;
                    office: string;
                };
            } & {
                id: number;
                cnpj: string;
                contract: boolean;
                inscricaoEstadual: string;
                userid: number;
                employeeId: number | null;
            };
            reports: {
                id: number;
                areaTrabalhada: number;
                date: string | null;
                hour: string | null;
                close: string | null;
                approved: boolean | null;
                totalPrice: number | null;
                pdf_path: string | null;
                callId: number;
                stage: number;
            }[];
            id: number;
            forecast: string;
            open: string | null;
            init: string | null;
            finish: string | null;
            approved: boolean | null;
            comments: string | null;
            totalPrice: number | null;
            status: import(".prisma/client").$Enums.CallStatus;
            talhaoId: number;
            kitId: number | null;
            producerId: number;
            userId: number;
        }[] | null;
        employees: {
            id: number;
            rg: string;
            gender: string;
            relationship: string;
            nationality: string;
            voter_card: string;
            work_card: string;
            military: string | null;
            residence: string;
            office: string;
            userid: number;
        }[];
        objects: {
            id: number;
            name: string;
            description: string;
            quantity: number | null;
            kitId: number | null;
        }[];
        id: number;
        image: string | null;
        name: string;
        description: string;
        active: boolean;
        hectareDay: number;
        equipment: string | null;
        model: string | null;
    } | ({
        operation: {
            id: number;
            service: string;
            culture: string;
            areaMap: number;
            equipment: string;
            model: string;
            reportId: number;
        } | null;
        material: {
            id: number;
            talhao: string;
            area: number;
            product: string;
            dosage: string;
            classification: string;
            total: string;
            removed: string;
            applied: string;
            returned: string;
            comments: string;
            reportId: number;
        }[];
        techReport: ({
            flight: {
                id: number;
                temperature: number;
                humidity: number;
                wind_velocity: number;
                height: number;
                faixa: number;
                flight_velocity: number;
                tank_volume: number;
                rate: number;
                performance: number;
                techReportId: number;
            }[];
        } & {
            id: number;
            date: string;
            init: string;
            finish: string;
            comments: string;
            reportId: number;
        }) | null;
        treatment: ({
            products: {
                id: number;
                name: string;
                dosage: string;
                treatmentId: number;
            }[];
        } & {
            id: number;
            reportId: number;
        }) | null;
        call: {
            kit: ({
                employees: ({
                    user: {
                        id: number;
                        name: string;
                        cpf: string;
                        birth: string;
                        phone: string;
                        image: string | null;
                        username: string;
                        email: string;
                        password: string;
                        isAdmin: boolean;
                        isManager: boolean;
                        approved: boolean;
                        rejected: string | null;
                        office: string;
                    };
                } & {
                    id: number;
                    rg: string;
                    gender: string;
                    relationship: string;
                    nationality: string;
                    voter_card: string;
                    work_card: string;
                    military: string | null;
                    residence: string;
                    office: string;
                    userid: number;
                })[];
            } & {
                id: number;
                image: string | null;
                name: string;
                description: string;
                active: boolean;
                hectareDay: number;
                equipment: string | null;
                model: string | null;
            }) | null;
            producer: {
                user: {
                    id: number;
                    name: string;
                    cpf: string;
                    birth: string;
                    phone: string;
                    image: string | null;
                    username: string;
                    email: string;
                    password: string;
                    isAdmin: boolean;
                    isManager: boolean;
                    approved: boolean;
                    rejected: string | null;
                    office: string;
                };
            } & {
                id: number;
                cnpj: string;
                contract: boolean;
                inscricaoEstadual: string;
                userid: number;
                employeeId: number | null;
            };
            talhao: {
                tillage: {
                    address: {
                        id: number;
                        street: string;
                        district: string;
                        number: string;
                        cep: string;
                        city: string;
                        uf: string;
                        adjunct: string;
                        userId: number | null;
                        tillageId: number | null;
                    } | null;
                } & {
                    id: number;
                    name: string;
                    area: number;
                    owner: string;
                    ceo: string;
                    manager: string | null;
                    agronomist: string | null;
                    technician: string | null;
                    pilot: string | null;
                    others: string | null;
                    comments: string | null;
                    cover: string | null;
                    hectarePrice: number | null;
                    producerId: number;
                };
            } & {
                id: number;
                name: string;
                area: number;
                cover: string | null;
                tillageId: number;
            };
            reports: {
                id: number;
                areaTrabalhada: number;
                date: string | null;
                hour: string | null;
                close: string | null;
                approved: boolean | null;
                totalPrice: number | null;
                pdf_path: string | null;
                callId: number;
                stage: number;
            }[];
        } & {
            id: number;
            forecast: string;
            open: string | null;
            init: string | null;
            finish: string | null;
            approved: boolean | null;
            comments: string | null;
            totalPrice: number | null;
            status: import(".prisma/client").$Enums.CallStatus;
            talhaoId: number;
            kitId: number | null;
            producerId: number;
            userId: number;
        };
    } & {
        id: number;
        areaTrabalhada: number;
        date: string | null;
        hour: string | null;
        close: string | null;
        approved: boolean | null;
        totalPrice: number | null;
        pdf_path: string | null;
        callId: number;
        stage: number;
    }) | {
        talhao: {
            cover: string;
            tillage: {
                cover: string;
                address: {
                    id: number;
                    street: string;
                    district: string;
                    number: string;
                    cep: string;
                    city: string;
                    uf: string;
                    adjunct: string;
                    userId: number | null;
                    tillageId: number | null;
                } | null;
                location: {
                    id: number;
                    x: string;
                    y: string;
                    talhaoId: number | null;
                    tillageId: number | null;
                }[];
                gallery: {
                    id: number;
                    name: string | null;
                    talhaoId: number | null;
                    tillageId: number;
                }[];
                id: number;
                name: string;
                area: number;
                owner: string;
                ceo: string;
                manager: string | null;
                agronomist: string | null;
                technician: string | null;
                pilot: string | null;
                others: string | null;
                comments: string | null;
                hectarePrice: number | null;
                producerId: number;
            };
            location: {
                id: number;
                x: string;
                y: string;
                talhaoId: number | null;
                tillageId: number | null;
            }[];
            gallery: {
                id: number;
                name: string | null;
                talhaoId: number | null;
                tillageId: number;
            }[];
            id: number;
            name: string;
            area: number;
            tillageId: number;
        };
        reports: {
            operation: {
                id: number;
                service: string;
                culture: string;
                areaMap: number;
                equipment: string;
                model: string;
                reportId: number;
            } | null;
            material: {
                id: number;
                talhao: string;
                area: number;
                product: string;
                dosage: string;
                classification: string;
                total: string;
                removed: string;
                applied: string;
                returned: string;
                comments: string;
                reportId: number;
            }[];
            techReport: ({
                flight: {
                    id: number;
                    temperature: number;
                    humidity: number;
                    wind_velocity: number;
                    height: number;
                    faixa: number;
                    flight_velocity: number;
                    tank_volume: number;
                    rate: number;
                    performance: number;
                    techReportId: number;
                }[];
            } & {
                id: number;
                date: string;
                init: string;
                finish: string;
                comments: string;
                reportId: number;
            }) | null;
            treatment: ({
                products: {
                    id: number;
                    name: string;
                    dosage: string;
                    treatmentId: number;
                }[];
            } & {
                id: number;
                reportId: number;
            }) | null;
            stages: {
                id: number;
                name: string | null;
                date: string | null;
                start: string | null;
                finish: string | null;
                duration: string | null;
                comments: string | null;
                reportId: number;
            }[];
            id: number;
            areaTrabalhada: number;
            date: string | null;
            hour: string | null;
            close: string | null;
            approved: boolean | null;
            totalPrice: number | null;
            pdf_path: string | null;
            callId: number;
            stage: number;
        }[] | null;
        kit: ({
            employees: ({
                user: {
                    id: number;
                    name: string;
                    cpf: string;
                    birth: string;
                    phone: string;
                    image: string | null;
                    username: string;
                    email: string;
                    password: string;
                    isAdmin: boolean;
                    isManager: boolean;
                    approved: boolean;
                    rejected: string | null;
                    office: string;
                };
            } & {
                id: number;
                rg: string;
                gender: string;
                relationship: string;
                nationality: string;
                voter_card: string;
                work_card: string;
                military: string | null;
                residence: string;
                office: string;
                userid: number;
            })[];
            objects: {
                id: number;
                name: string;
                description: string;
                quantity: number | null;
                kitId: number | null;
            }[];
            calls: {
                id: number;
                forecast: string;
                open: string | null;
                init: string | null;
                finish: string | null;
                approved: boolean | null;
                comments: string | null;
                totalPrice: number | null;
                status: import(".prisma/client").$Enums.CallStatus;
                talhaoId: number;
                kitId: number | null;
                producerId: number;
                userId: number;
            }[];
        } & {
            id: number;
            image: string | null;
            name: string;
            description: string;
            active: boolean;
            hectareDay: number;
            equipment: string | null;
            model: string | null;
        }) | null;
        user: {
            id: number;
            name: string;
            cpf: string;
            birth: string;
            phone: string;
            image: string | null;
            username: string;
            email: string;
            password: string;
            isAdmin: boolean;
            isManager: boolean;
            approved: boolean;
            rejected: string | null;
            office: string;
        };
        producer: {
            user: {
                id: number;
                name: string;
                cpf: string;
                birth: string;
                phone: string;
                image: string | null;
                username: string;
                email: string;
                password: string;
                isAdmin: boolean;
                isManager: boolean;
                approved: boolean;
                rejected: string | null;
                office: string;
            };
        } & {
            id: number;
            cnpj: string;
            contract: boolean;
            inscricaoEstadual: string;
            userid: number;
            employeeId: number | null;
        };
        id: number;
        forecast: string;
        open: string | null;
        init: string | null;
        finish: string | null;
        approved: boolean | null;
        comments: string | null;
        totalPrice: number | null;
        status: import(".prisma/client").$Enums.CallStatus;
        talhaoId: number;
        kitId: number | null;
        producerId: number;
        userId: number;
    } | {
        cover: string;
        tillage: {
            cover: string;
            address: {
                id: number;
                street: string;
                district: string;
                number: string;
                cep: string;
                city: string;
                uf: string;
                adjunct: string;
                userId: number | null;
                tillageId: number | null;
            } | null;
            id: number;
            name: string;
            area: number;
            owner: string;
            ceo: string;
            manager: string | null;
            agronomist: string | null;
            technician: string | null;
            pilot: string | null;
            others: string | null;
            comments: string | null;
            hectarePrice: number | null;
            producerId: number;
        };
        calls: {
            talhao: {
                cover: string;
                id: number;
                name: string;
                area: number;
                tillageId: number;
            };
            kit: ({
                employees: ({
                    user: {
                        id: number;
                        name: string;
                        cpf: string;
                        birth: string;
                        phone: string;
                        image: string | null;
                        username: string;
                        email: string;
                        password: string;
                        isAdmin: boolean;
                        isManager: boolean;
                        approved: boolean;
                        rejected: string | null;
                        office: string;
                    };
                } & {
                    id: number;
                    rg: string;
                    gender: string;
                    relationship: string;
                    nationality: string;
                    voter_card: string;
                    work_card: string;
                    military: string | null;
                    residence: string;
                    office: string;
                    userid: number;
                })[];
            } & {
                id: number;
                image: string | null;
                name: string;
                description: string;
                active: boolean;
                hectareDay: number;
                equipment: string | null;
                model: string | null;
            }) | null;
            producer: {
                user: {
                    id: number;
                    name: string;
                    cpf: string;
                    birth: string;
                    phone: string;
                    image: string | null;
                    username: string;
                    email: string;
                    password: string;
                    isAdmin: boolean;
                    isManager: boolean;
                    approved: boolean;
                    rejected: string | null;
                    office: string;
                };
            } & {
                id: number;
                cnpj: string;
                contract: boolean;
                inscricaoEstadual: string;
                userid: number;
                employeeId: number | null;
            };
            reports: ({
                operation: {
                    id: number;
                    service: string;
                    culture: string;
                    areaMap: number;
                    equipment: string;
                    model: string;
                    reportId: number;
                } | null;
                material: {
                    id: number;
                    talhao: string;
                    area: number;
                    product: string;
                    dosage: string;
                    classification: string;
                    total: string;
                    removed: string;
                    applied: string;
                    returned: string;
                    comments: string;
                    reportId: number;
                }[];
                techReport: {
                    id: number;
                    date: string;
                    init: string;
                    finish: string;
                    comments: string;
                    reportId: number;
                } | null;
                treatment: ({
                    products: {
                        id: number;
                        name: string;
                        dosage: string;
                        treatmentId: number;
                    }[];
                } & {
                    id: number;
                    reportId: number;
                }) | null;
                call: {
                    id: number;
                    forecast: string;
                    open: string | null;
                    init: string | null;
                    finish: string | null;
                    approved: boolean | null;
                    comments: string | null;
                    totalPrice: number | null;
                    status: import(".prisma/client").$Enums.CallStatus;
                    talhaoId: number;
                    kitId: number | null;
                    producerId: number;
                    userId: number;
                };
                stages: {
                    id: number;
                    name: string | null;
                    date: string | null;
                    start: string | null;
                    finish: string | null;
                    duration: string | null;
                    comments: string | null;
                    reportId: number;
                }[];
            } & {
                id: number;
                areaTrabalhada: number;
                date: string | null;
                hour: string | null;
                close: string | null;
                approved: boolean | null;
                totalPrice: number | null;
                pdf_path: string | null;
                callId: number;
                stage: number;
            })[];
            id: number;
            forecast: string;
            open: string | null;
            init: string | null;
            finish: string | null;
            approved: boolean | null;
            comments: string | null;
            totalPrice: number | null;
            status: import(".prisma/client").$Enums.CallStatus;
            talhaoId: number;
            kitId: number | null;
            producerId: number;
            userId: number;
        }[];
        location: {
            id: number;
            x: string;
            y: string;
            talhaoId: number | null;
            tillageId: number | null;
        }[];
        gallery: ({
            images: {
                id: number;
                url: string;
                galleryId: number;
            }[];
        } & {
            id: number;
            name: string | null;
            talhaoId: number | null;
            tillageId: number;
        })[];
        id: number;
        name: string;
        area: number;
        tillageId: number;
    } | null | undefined>;
    static new(data: NewNotification): Promise<void>;
    static load(id: number): Promise<NotificationClass>;
    static viewed(socket: Socket, id: number, user_id: number): Promise<void>;
    static list(socket: Socket, user_id: number): Promise<void>;
}
export declare class Notification {
    constructor(data: NewNotification);
    static getAdmins(): Promise<{
        id: number;
        name: string;
        cpf: string;
        birth: string;
        phone: string;
        image: string | null;
        username: string;
        email: string;
        password: string;
        isAdmin: boolean;
        isManager: boolean;
        approved: boolean;
        rejected: string | null;
        office: string;
    }[]>;
}
