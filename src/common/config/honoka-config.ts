export interface HonokaConfig {
    joinRoleId: string
    selfRoles: SelfRole[]
}

export interface SelfRole {
    label: string
    description: string
    emoji: string
    value: string
    roleId: string
}