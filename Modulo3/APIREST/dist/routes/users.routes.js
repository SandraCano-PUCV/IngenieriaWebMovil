import { Router } from "express";
const router = Router();
let users = [
    {
        id: 1,
        nombre: "Ana",
        email: "ana@correo.cl",
        password: "1234"
    },
    {
        id: 2,
        nombre: "Luis",
        email: "luis@correo.cl",
        password: "abcd"
    }
];
// =====================================
// INICIO DE SESIÓN
// POST /api/users/login
// =====================================
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({
            message: "Correo o contraseña incorrectos"
        });
    }
    res.json({
        message: "Inicio de sesión exitoso",
        user: {
            id: user.id,
            nombre: user.nombre,
            email: user.email
        }
    });
});
// =====================================
// RECURSO USERS
// =====================================
// GET /api/users
router.get("/", (req, res) => {
    res.json(users);
});
// POST /api/users
router.post("/", (req, res) => {
    const nuevoUser = {
        id: users.length + 1,
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
    };
    users.push(nuevoUser);
    res.status(201).json(nuevoUser);
});
// PUT /api/users/:id
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({
            message: "Usuario no encontrado"
        });
    }
    user.nombre = req.body.nombre;
    user.email = req.body.email;
    user.password = req.body.password;
    res.json(user);
});
// DELETE /api/users/:id
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Usuario no encontrado"
        });
    }
    const eliminado = users.splice(index, 1);
    res.json({
        message: "Usuario eliminado",
        user: eliminado[0]
    });
});
export default router;
