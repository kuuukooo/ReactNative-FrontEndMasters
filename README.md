# Taskly 📝

Una aplicación móvil simple construida con React Native y Expo como parte del curso de React Native de Frontend Masters.

## 🎯 Descripción

Taskly es una aplicación de productividad que combina dos funcionalidades principales:

- **Lista de tareas/compras**: Permite agregar, completar y eliminar elementos de una lista
- **Contador/Timer**: Un sistema de notificaciones periódicas para recordatorios

## ✨ Funcionalidades

### 📋 Lista de Tareas

- Agregar nuevos elementos a la lista
- Marcar elementos como completados
- Eliminar elementos con confirmación
- Persistencia de datos local
- Animaciones suaves con LayoutAnimation
- Feedback háptico

### ⏰ Contador

- Timer configurable con notificaciones push
- Historial de completaciones
- Estado persistente entre sesiones de la app
- Interfaz visual con segmentos de tiempo
- Manejo de estados de sobrecarga (overdue)

## 🛠️ Tecnologías Utilizadas

- **React Native 0.79.5**
- **Expo ~53.0.20**
- **Expo Router** para navegación
- **TypeScript** para tipado estático
- **AsyncStorage** para persistencia de datos
- **Expo Notifications** para notificaciones push
- **Expo Haptics** para feedback táctil
- **date-fns** para manejo de fechas
- **ESLint + Prettier** para calidad de código

## 📱 Estructura del Proyecto

```
taskly/
├── app/                          # Rutas de la aplicación (Expo Router)
│   ├── index.tsx                # Pantalla principal (Lista de tareas)
│   ├── _layout.tsx              # Layout base
│   └── counter/                 # Funcionalidad del contador
│       ├── index.tsx            # Pantalla del contador
│       ├── history.tsx          # Historial de completaciones
│       └── _layout.tsx          # Layout del contador
├── components/                   # Componentes reutilizables
│   ├── ShoppingListItem.tsx     # Item de la lista de tareas
│   └── TimeSegment.tsx          # Segmento de tiempo para el contador
├── utils/                       # Utilidades
│   ├── storage.ts               # Manejo de AsyncStorage
│   └── registerForPushNotificationsAsync.ts
├── assets/                      # Recursos de la aplicación
└── theme.ts                     # Configuración de tema/colores
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI
- Dispositivo móvil o emulador

### Pasos de instalación

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd taskly
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**

   ```bash
   npx expo start
   ```

4. **Ejecutar en dispositivo**
   - Escanea el código QR con la app Expo Go (Android/iOS)
   - O presiona `a` para Android o `i` para iOS en la terminal

## 📱 Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web

# Ejecutar linter
npm run lint
```

## 🎨 Características Técnicas

### Navegación

- Implementa **Expo Router** para navegación basada en archivos
- Navegación por pestañas entre Lista y Contador
- Layouts anidados para mejor organización

### Persistencia de Datos

- Utiliza **AsyncStorage** para guardar datos localmente
- Manejo de estados con React Hooks (useState, useEffect)
- Serialización/deserialización automática de datos

### Notificaciones

- Configuración de notificaciones push locales
- Permisos automáticos para notificaciones
- Programación de recordatorios periódicos

### UX/UI

- Diseño responsivo y nativo
- Animaciones fluidas con LayoutAnimation
- Feedback háptico para mejor experiencia de usuario
- Confirmaciones para acciones destructivas

## 🧩 Componentes Principales

### ShoppingListItem

Componente para elementos de la lista con funcionalidades:

- Toggle de completado
- Eliminación con confirmación
- Estados visuales dinámicos

### TimeSegment

Componente para mostrar segmentos de tiempo en el contador:

- Formato de tiempo legible
- Estilos condicionales según el estado

## 📚 Aprendizajes del Curso

Este proyecto cubre conceptos fundamentales de React Native:

- Configuración de proyectos con Expo
- Navegación con Expo Router
- Manejo de estado local
- Persistencia de datos
- Notificaciones push
- Componentes nativos
- Estilización con StyleSheet
- Hooks de React
- TypeScript en React Native

## 📄 Licencia

Este proyecto es de uso educativo y está disponible bajo una licencia abierta.

## 👨‍💻 Autor

Desarrollado como parte del curso de React Native de Frontend Masters.

## 🔗 Recursos Útiles

- [Documentación de Expo](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Frontend Masters](https://frontendmasters.com/)
- [Expo Router](https://expo.github.io/router/docs/)
