require('dotenv').config();
const { prisma } = require('../config/db');

async function seedCurso() {
    try {
        console.log('🌱 Poblando curso "English for Nursing Professionals"...\n');

        // ── Obtener o crear el curso ──────────────────────────
        let curso = await prisma.curso.findFirst({ where: { titulo: { contains: 'English for Nursing' } } });
        if (!curso) {
            const instructor = await prisma.user.findFirst({ where: { rol_usuario: 'instructor' } });
            curso = await prisma.curso.create({
                data: {
                    titulo:       'English for Nursing Professionals',
                    descripcion:  'Ruta formativa de inglés técnico para enfermería. Sigue el caso clínico de Mr. Thomas desde urgencias hasta el alta médica.',
                    nivel:        'basico',
                    instructorId: instructor.id,
                },
            });
        }
        console.log(`✅ Curso: ${curso.titulo} (id=${curso.id})`);

        // ── PRE-TEST (actividad suelta sin módulo, en módulo virtual) ──
        // La añadiremos al primer módulo como primera actividad

        // ═══════════════════════════════════════════════════════
        // MÓDULO 1 — GETTING TO KNOW OTHER PEOPLE
        // ═══════════════════════════════════════════════════════
        const modulo1 = await upsertModulo(curso.id, {
            titulo:      'Getting to Know Other People',
            descripcion: 'Saludos, presentaciones y estructura básica del inglés. RAP 1.',
            orden:       0,
        });
        console.log(`\n📦 Módulo 1: ${modulo1.titulo}`);

        // ── M1: MOMENTO 1 — Preparación ──────────────────────
        const m1_mom1 = await upsertMomento(modulo1.id, { nombre: 'Preparación', tipo: 'preparacion', orden: 0 });

        await upsertActividad(m1_mom1.id, 0, 'pretest', 'Diagnóstico Inicial — PRE-TEST', '¡Bienvenido! Antes de comenzar, responde este breve diagnóstico. No afecta tu nota — es solo para medir tu punto de partida.', {
            preguntas: [
                { pregunta: 'Which greeting is used in the morning?', opciones: ['Good afternoon', 'Good morning', 'Good evening', 'Goodbye'], correcta: 1, explicacion: 'Good morning se usa desde el amanecer hasta el mediodía.' },
                { pregunta: 'Complete: "I ___ a nurse."', opciones: ['am', 'is', 'are', 'be'], correcta: 0, explicacion: 'Con "I" siempre usamos "am".' },
                { pregunta: 'What does "discharge" mean?', opciones: ['Alta médica', 'Temperatura', 'Medicamento', 'Turno'], correcta: 0, explicacion: 'Discharge = alta médica en el contexto clínico.' },
                { pregunta: 'How do you spell the letter "H"?', opciones: ['aitch', 'ache', 'eich', 'hay'], correcta: 0, explicacion: 'La letra H se deletrea "aitch" en inglés británico.' },
            ],
        });

        await upsertActividad(m1_mom1.id, 1, 'warm_up_drag', 'Warm-Up — Saludos del día', 'Arrastra cada imagen hacia el saludo correspondiente según la hora del día.', {
            instrucciones: 'Arrastra las imágenes hacia el saludo correcto',
            items: [
                { id: 'morning',   emoji: '🌅', texto: 'Good morning' },
                { id: 'afternoon', emoji: '☀️', texto: 'Good afternoon' },
                { id: 'evening',   emoji: '🌙', texto: 'Good evening' },
            ],
        });

        // ── M1: MOMENTO 2 — Absorción de conocimiento ────────
        const m1_mom2 = await upsertMomento(modulo1.id, { nombre: 'Absorción de Conocimiento', tipo: 'absorcion', orden: 1 });

        await upsertActividad(m1_mom2.id, 0, 'grammar_pill', 'Grammar Pill — Verbo To Be y Estructura S+V+C', 'Estudia la estructura básica de la oración en inglés. Cada color representa una parte diferente.', {
            titulo:   'Sujeto + Verbo + Complemento',
            columnas: ['Sujeto', 'Verbo (To Be)', 'Complemento'],
            colores:  ['blue', 'orange', 'green'],
            filas: [
                ['I',            'am',  'a nurse at the hospital.'],
                ['You',          'are', 'a new patient.'],
                ['He / She',     'is',  'a doctor in room 5.'],
                ['We / They',    'are', 'healthcare professionals.'],
                ['Mr. Thomas',   'is',  'a patient from the USA.'],
            ],
            nota: 'Todos los ejemplos están contextualizados en el entorno de enfermería. El caso clínico de Mr. Thomas comenzará en el Módulo 2.',
        });

        await upsertActividad(m1_mom2.id, 1, 'flashcard_vocab', 'Laboratorio de Vocabulario — Saludos e Información Personal', 'Haz clic en cada tarjeta para voltearla y aprender la traducción. ¡Explóralas todas!', {
            instrucciones: 'Haz clic en cada tarjeta para voltearla',
            cards: [
                { frente: 'Hello',          reverso: 'Hola',                emoji: '👋' },
                { frente: 'Good morning',   reverso: 'Buenos días',          emoji: '🌅' },
                { frente: 'Good afternoon', reverso: 'Buenas tardes',        emoji: '☀️' },
                { frente: 'Good evening',   reverso: 'Buenas noches',        emoji: '🌙' },
                { frente: 'My name is...',  reverso: 'Mi nombre es...',      emoji: '🪪' },
                { frente: 'Nice to meet you', reverso: 'Mucho gusto',        emoji: '🤝' },
                { frente: 'Phone number',   reverso: 'Número de teléfono',   emoji: '📱' },
                { frente: 'Email address',  reverso: 'Correo electrónico',   emoji: '📧' },
                { frente: 'Goodbye',        reverso: 'Hasta luego',          emoji: '👋' },
                { frente: 'See you later',  reverso: 'Hasta pronto',         emoji: '🕐' },
                { frente: 'Spell it',       reverso: 'Deletréalo',           emoji: '🔡' },
                { frente: 'How are you?',   reverso: '¿Cómo estás?',        emoji: '💬' },
            ],
        });

        await upsertActividad(m1_mom2.id, 2, 'storybook_chat', 'Storybook — Saludos y Presentaciones entre Colegas', 'Lee la conversación entre dos enfermeras que se presentan por primera vez. Observa cómo se usan los saludos y la estructura S+V+C.', {
            escena: 'Pasillo del hospital — primer día de turno',
            personajes: {
                A: { nombre: 'Nurse Ana', color: '#0891b2' },
                B: { nombre: 'Nurse Ben', color: '#7c3aed' },
            },
            mensajes: [
                { personaje: 'A', texto: 'Good morning! My name is Ana. I am the head nurse on this floor.' },
                { personaje: 'B', texto: 'Good morning, Ana! Nice to meet you. I am Ben. I am a new nurse here.' },
                { personaje: 'A', texto: 'Welcome, Ben! Are you from the day shift or the night shift?' },
                { personaje: 'B', texto: 'I am from the day shift. My phone number is 300-123-4567, in case you need me.' },
                { personaje: 'A', texto: 'Perfect! And your email? We use it for patient reports.' },
                { personaje: 'B', texto: 'Of course. It is b-e-n dot nurse at hospital dot com. Shall I spell it again?' },
                { personaje: 'A', texto: 'No, that is perfect! Thank you, Ben. Let\'s start the shift.' },
            ],
        });

        // ── M1: MOMENTO 3 — Práctica y Aplicación ────────────
        const m1_mom3 = await upsertMomento(modulo1.id, { nombre: 'Práctica y Aplicación', tipo: 'practica', orden: 2 });

        await upsertActividad(m1_mom3.id, 0, 'practica_fill', 'Práctica 1 — Completar Ficha de Paciente', 'Completa el formulario de identificación del paciente extranjero Mr. Thomas. Usa la estructura Sujeto + Verbo + Complemento.', {
            tipo:      'id_card',
            formTitle: '🪪 Patient Identification Card — Mr. Thomas',
            campos: [
                { id: 'first_name', label: 'First Name',     placeholder: 'Escribe el nombre',    respuesta: 'Thomas' },
                { id: 'last_name',  label: 'Last Name',      placeholder: 'Escribe el apellido',   respuesta: 'Anderson' },
                { id: 'country',    label: 'Country',        placeholder: 'País de origen',         respuesta: 'United States' },
                { id: 'language',   label: 'Language',       placeholder: 'Idioma del paciente',   respuesta: 'English' },
                { id: 'phone',      label: 'Phone Number',   placeholder: 'Número de contacto',   respuesta: '+1 555 0123' },
                { id: 'email',      label: 'Email Address',  placeholder: 'Correo electrónico',    respuesta: 'thomas@mail.com' },
            ],
        });

        await upsertActividad(m1_mom3.id, 1, 'practica_audio_form', 'Práctica 2 — Listening: Deletrear nombre y correo', 'Escucha a Mr. Thomas deletrear su nombre y correo electrónico, luego escríbelos correctamente.', {
            audio_url: null,
            transcripcion: 'Hello, my name is Thomas Anderson. T-H-O-M-A-S A-N-D-E-R-S-O-N. My email is thomas@mail.com. T-H-O-M-A-S at mail dot com.',
            campos: [
                { id: 'nombre_deletreado', label: 'Nombre deletreado (spelling)', placeholder: 'T-H-O-M-A-S ...', respuesta: 'T-H-O-M-A-S' },
                { id: 'email_escuchado',   label: 'Email address',               placeholder: 'Escribe el email...', respuesta: 'thomas@mail.com' },
            ],
        });

        await upsertActividad(m1_mom3.id, 2, 'desafio_audio', 'Desafío — Grabación: Mi Presentación Personal', 'Es hora de practicar. Graba tu presentación siguiendo las 4 misiones. Tienes máximo 1 minuto.', {
            titulo:      'Grabar Presentación Personal (Máx. 1 min)',
            max_seconds: 60,
            misiones: [
                'Saluda usando el saludo correcto según la hora del día (Good morning / afternoon / evening)',
                'Di tu nombre completo: "My name is ___"',
                'Deletrea tu apellido letra por letra: "My last name is ___, spelled: ___"',
                'Da tu número de teléfono: "My phone number is ___"',
            ],
            ejemplo: '"Good morning! My name is María García. My last name is García, spelled G-A-R-C-I-A. My phone number is 300 123 4567."',
        });

        // ── M1: MOMENTO 4 — Cierre ────────────────────────────
        const m1_mom4 = await upsertMomento(modulo1.id, { nombre: 'Cierre', tipo: 'cierre', orden: 3 });

        await upsertActividad(m1_mom4.id, 0, 'quiz_multiple', 'Quiz — Prueba tus Conocimientos RAP 1', 'Responde correctamente el 70% de las preguntas para obtener tu primera insignia.', {
            minimo_aprobacion: 70,
            insignia: {
                tipo:        'rap1',
                nombre:      'RAP 1 Badge',
                descripcion: 'Completaste el Módulo 1: Getting to Know Other People',
                emoji:       '🏅',
            },
            preguntas: [
                { pregunta: '¿Cuál es el saludo correcto a las 9 AM?', opciones: ['Good evening', 'Good morning', 'Good night', 'Goodbye'], correcta: 1, explicacion: '"Good morning" se usa desde el amanecer hasta el mediodía.' },
                { pregunta: 'Complete: "I ___ a nurse at the hospital."', opciones: ['am', 'is', 'are', 'be'], correcta: 0, explicacion: 'Con el sujeto "I" siempre usamos "am".' },
                { pregunta: 'How do you introduce yourself formally?', opciones: ['Hey, I\'m Ana!', 'My name is Ana. I am a nurse.', 'Call me Ana.', 'Ana here.'], correcta: 1, explicacion: 'La presentación formal incluye nombre completo y rol profesional.' },
                { pregunta: 'Mr. Thomas spells his name: T-H-O-M-A-S. How is it written?', opciones: ['Tomas', 'Thomas', 'Thomás', 'Thomes'], correcta: 1, explicacion: 'T-H-O-M-A-S se escribe "Thomas".' },
                { pregunta: '¿Qué estructura tiene la oración "She is a doctor"?', opciones: ['S + V + C', 'V + S + C', 'C + S + V', 'S + C + V'], correcta: 0, explicacion: '"She" = Sujeto, "is" = Verbo, "a doctor" = Complemento.' },
                { pregunta: 'What does "Nice to meet you" mean?', opciones: ['Hasta luego', 'Buenos días', 'Mucho gusto', 'Por favor'], correcta: 2, explicacion: '"Nice to meet you" es el equivalente de "Mucho gusto / Encantado de conocerte".' },
            ],
        });

        // ═══════════════════════════════════════════════════════
        // MÓDULO 2 — WORK LIFE INTERACTION
        // ═══════════════════════════════════════════════════════
        const modulo2 = await upsertModulo(curso.id, {
            titulo:      'Work Life Interaction',
            descripcion: 'Mr. Thomas es hospitalizado. Aprende pasado simple, adjetivos y vocabulario del cuerpo humano. RAP 2 y 3.',
            orden:       1,
        });
        console.log(`📦 Módulo 2: ${modulo2.titulo}`);

        const m2_mom1 = await upsertMomento(modulo2.id, { nombre: 'Preparación', tipo: 'preparacion', orden: 0 });
        await upsertActividad(m2_mom1.id, 0, 'warm_up_drag', 'Warm-Up — Turnos de enfermería', 'Relaciona cada turno del día con el saludo correcto.', {
            instrucciones: 'Arrastra cada turno hacia el saludo correspondiente',
            items: [
                { id: 'morning',   emoji: '🌅', texto: 'Good morning' },
                { id: 'afternoon', emoji: '🏥', texto: 'Good afternoon' },
                { id: 'night',     emoji: '🌙', texto: 'Good evening' },
            ],
        });

        const m2_mom2 = await upsertMomento(modulo2.id, { nombre: 'Absorción de Conocimiento', tipo: 'absorcion', orden: 1 });
        await upsertActividad(m2_mom2.id, 0, 'grammar_pill', 'Grammar Pill — Pasado Simple + Adjetivos Descriptivos', 'Aprende a describir qué le ocurrió al paciente (pasado) y cómo está ahora (adjetivos).', {
            titulo:   'Patient History vs. Current Status',
            columnas: ['Patient History (Pasado Simple)', 'Current Status (Adjetivos)'],
            colores:  ['orange', 'green'],
            filas: [
                ['He fell at the hotel.',     'He is pale and tired.'],
                ['He had an accident.',       'The room is cold.'],
                ['He arrived by ambulance.',  'Mr. Thomas is weak.'],
                ['The pain started yesterday.','He looks uncomfortable.'],
            ],
            nota: 'Usa el pasado simple para contar lo que ocurrió ANTES. Usa adjetivos para describir el estado ACTUAL del paciente.',
        });

        await upsertActividad(m2_mom2.id, 1, 'flashcard_vocab', 'Vocabulario — Cuerpo Humano y Entorno Hospitalario', 'Aprende el vocabulario esencial del cuerpo humano y las áreas del hospital.', {
            instrucciones: 'Voltea cada tarjeta para ver la traducción',
            cards: [
                { frente: 'Head',          reverso: 'Cabeza',           emoji: '🧠' },
                { frente: 'Arm',           reverso: 'Brazo',            emoji: '💪' },
                { frente: 'Leg',           reverso: 'Pierna',           emoji: '🦵' },
                { frente: 'Chest',         reverso: 'Pecho / Tórax',    emoji: '🫀' },
                { frente: 'Back',          reverso: 'Espalda',          emoji: '🫁' },
                { frente: 'Knee',          reverso: 'Rodilla',          emoji: '🦿' },
                { frente: 'Waiting room',  reverso: 'Sala de espera',   emoji: '🪑' },
                { frente: 'Stretcher',     reverso: 'Camilla',          emoji: '🛏️' },
                { frente: 'Hospital bed',  reverso: 'Cama hospitalaria', emoji: '🏥' },
                { frente: 'Bandage',       reverso: 'Vendaje',          emoji: '🩹' },
                { frente: 'Pain',          reverso: 'Dolor',            emoji: '😣' },
                { frente: 'Fracture',      reverso: 'Fractura',         emoji: '🦴' },
            ],
        });

        await upsertActividad(m2_mom2.id, 2, 'storybook_chat', 'Storybook — Entrega de Turno: Mr. Thomas llega a urgencias', 'Nurse A entrega el turno a Nurse B y describe el estado de Mr. Thomas.', {
            escena: 'Estación de enfermería — Entrega de turno (RAP 2 y 3)',
            personajes: {
                A: { nombre: 'Nurse Ana', color: '#0891b2' },
                B: { nombre: 'Nurse Ben', color: '#7c3aed' },
            },
            mensajes: [
                { personaje: 'A', texto: 'Good afternoon, Ben! Let me give you the patient update.' },
                { personaje: 'B', texto: 'Of course. How is Mr. Thomas in room 204?' },
                { personaje: 'A', texto: 'He is a tall, older man. He is pale and feels very tired today.' },
                { personaje: 'B', texto: 'What happened to him?' },
                { personaje: 'A', texto: 'Yesterday, he fell at the hotel and had a fracture in his left leg.' },
                { personaje: 'B', texto: 'That sounds serious. Where is he right now?' },
                { personaje: 'A', texto: 'He is in the hospital bed in room 204. He has a bandage on his leg.' },
                { personaje: 'B', texto: 'Understood. I will check on him immediately. Thank you, Ana.' },
            ],
        });

        const m2_mom3 = await upsertMomento(modulo2.id, { nombre: 'Práctica y Aplicación', tipo: 'practica', orden: 2 });
        await upsertActividad(m2_mom3.id, 0, 'practica_audio_form', 'Práctica 1 — Listening: Notas de Enfermería', 'Escucha al médico describir a Mr. Thomas y completa las notas de enfermería.', {
            audio_url: null,
            transcripcion: 'Patient: Thomas Anderson, room 204. Yesterday, the patient fell in the waiting room of the hotel. He has a fracture in his left leg. He is pale, tired, and feels weak. He arrived by ambulance this morning.',
            campos: [
                { id: 'patient',    label: 'Patient Name',    placeholder: 'Nombre del paciente',    respuesta: 'Thomas Anderson' },
                { id: 'room',       label: 'Room',            placeholder: 'Número de habitación',   respuesta: '204' },
                { id: 'diagnosis',  label: 'Diagnosis',       placeholder: 'Diagnóstico en inglés',  respuesta: 'fracture' },
                { id: 'location',   label: 'Where did it happen?', placeholder: 'Lugar del incidente', respuesta: 'hotel' },
            ],
        });

        await upsertActividad(m2_mom3.id, 1, 'practica_dropdown', 'Práctica 2 — Describe la habitación de Mr. Thomas', 'Observa la descripción y selecciona la opción correcta para cada oración.', {
            items: [
                { prefijo: 'The patient', opciones: ['is in the bed', 'are in the bed', 'am in the bed'], correcta: 0 },
                { prefijo: 'Mr. Thomas', opciones: ['has a bandage on his arm', 'has a bandage on his leg', 'have a bandage on his head'], correcta: 1 },
                { prefijo: 'Yesterday, he', opciones: ['falls at the hotel', 'fell at the hotel', 'fall at the hotel'], correcta: 1 },
                { prefijo: 'He', opciones: ['is pale and tired', 'are pale and tired', 'was pale and tired'], correcta: 0 },
            ],
        });

        await upsertActividad(m2_mom3.id, 2, 'desafio_audio', 'Desafío — Entrega de Turno de Mr. Thomas', 'Graba un audio simulando que entregas el turno a tu compañero. Describe a Mr. Thomas como si fueras Nurse Ana.', {
            titulo:      'Voice Note — Handover Report (Máx. 1 min)',
            max_seconds: 60,
            misiones: [
                'Describe físicamente a Mr. Thomas (apariencia, estado actual)',
                'Indica en qué lugar de la clínica se encuentra (habitación, área)',
                'Relata brevemente qué le ocurrió usando verbos en pasado (fell, had, arrived)',
            ],
            ejemplo: '"Good afternoon! This is the handover for Mr. Thomas in room 204. He is a tall, older man. He is pale and tired. Yesterday, he fell at the hotel and had a fracture in his left leg. He is currently in his hospital bed."',
        });

        const m2_mom4 = await upsertMomento(modulo2.id, { nombre: 'Cierre', tipo: 'cierre', orden: 3 });
        await upsertActividad(m2_mom4.id, 0, 'quiz_multiple', 'Quiz — RAP 2 y 3: Interacción en el Trabajo', 'Demuestra lo que aprendiste sobre el pasado simple, los adjetivos y el vocabulario hospitalario.', {
            minimo_aprobacion: 70,
            insignia: {
                tipo:        'rap2_3',
                nombre:      'Handover Specialist Badge',
                descripcion: 'Completaste el Módulo 2: Work Life Interaction',
                emoji:       '🔄',
            },
            preguntas: [
                { pregunta: 'Complete: "Yesterday, Mr. Thomas ___ at the hotel."', opciones: ['fall', 'fell', 'falls', 'falled'], correcta: 1, explicacion: '"Fell" es el pasado irregular de "fall".' },
                { pregunta: 'What does "fracture" mean?', opciones: ['Temperatura', 'Fractura', 'Medicamento', 'Vendaje'], correcta: 1, explicacion: '"Fracture" en español es "fractura" — una ruptura en un hueso.' },
                { pregunta: 'Which describes the CURRENT state of a patient?', opciones: ['He fell yesterday', 'He arrived by ambulance', 'He is pale and tired', 'He had an accident'], correcta: 2, explicacion: 'Los adjetivos como "pale" y "tired" describen el estado actual (presente).' },
                { pregunta: 'Where is Mr. Thomas now?', opciones: ['In the waiting room', 'At the hotel', 'In room 204', 'In the ambulance'], correcta: 2, explicacion: 'Según el storybook, Mr. Thomas está en la habitación 204.' },
                { pregunta: 'Complete: "He ___ a bandage on his leg."', opciones: ['have', 'has', 'is', 'are'], correcta: 1, explicacion: 'Con "He" usamos "has" (tercera persona singular del verbo "have").' },
            ],
        });

        // ═══════════════════════════════════════════════════════
        // MÓDULO 3 — WORK PLACE COMMUNICATION
        // ═══════════════════════════════════════════════════════
        const modulo3 = await upsertModulo(curso.id, {
            titulo:      'Work Place Communication',
            descripcion: 'Tu turno de enfermería está en curso. Aprende presente simple, continuo y vocabulario de instrumentos clínicos. RAP 4 y 5.',
            orden:       2,
        });
        console.log(`📦 Módulo 3: ${modulo3.titulo}`);

        const m3_mom1 = await upsertMomento(modulo3.id, { nombre: 'Preparación', tipo: 'preparacion', orden: 0 });
        await upsertActividad(m3_mom1.id, 0, 'warm_up_drag', 'Warm-Up — Acciones de Enfermería', 'Relaciona cada acción de enfermería con el interlocutor correcto.', {
            instrucciones: 'Arrastra cada acción hacia el interlocutor correspondiente',
            items: [
                { id: 'doctor',   emoji: '👨‍⚕️', texto: 'Talk to doctor' },
                { id: 'patient',  emoji: '🛏️',  texto: 'Check vital signs' },
                { id: 'visitor',  emoji: '👨‍👩‍👧', texto: 'Talk to family' },
            ],
        });

        const m3_mom2 = await upsertMomento(modulo3.id, { nombre: 'Absorción de Conocimiento', tipo: 'absorcion', orden: 1 });
        await upsertActividad(m3_mom2.id, 0, 'grammar_pill', 'Grammar Pill — Presente Simple vs. Presente Continuo', 'Aprende la diferencia entre rutinas diarias y acciones que ocurren en este momento.', {
            titulo:   'Daily Routine vs. Happening Now',
            columnas: ['Daily Routine (Presente Simple)', 'Happening Now (Presente Continuo)'],
            colores:  ['blue', 'orange'],
            filas: [
                ['I give medication at 8 AM.',         'I am giving medication right now.'],
                ['She checks vital signs every hour.',  'She is checking the blood pressure.'],
                ['We update the checklist daily.',      'We are updating Mr. Thomas\'s chart.'],
                ['He takes pain medication at noon.',   'He is resting in room 204.'],
            ],
            nota: 'Sugerencias: We should update the checklist. / Let\'s check the temperature. / I think we should call the doctor.',
        });

        await upsertActividad(m3_mom2.id, 1, 'flashcard_vocab', 'Vocabulario — Instrumentos Clínicos', 'Aprende los nombres de los instrumentos más usados en enfermería.', {
            instrucciones: 'Voltea cada tarjeta para ver el nombre en inglés',
            cards: [
                { frente: 'Thermometer',              reverso: 'Termómetro',             emoji: '🌡️' },
                { frente: 'Stethoscope',              reverso: 'Estetoscopio',            emoji: '🩺' },
                { frente: 'Blood pressure monitor',   reverso: 'Tensiómetro',             emoji: '💉' },
                { frente: 'Checklist',                reverso: 'Lista de verificación',   emoji: '📋' },
                { frente: 'Syringe',                  reverso: 'Jeringa',                emoji: '💉' },
                { frente: 'IV drip',                  reverso: 'Suero / Venoclisis',     emoji: '🩸' },
                { frente: 'Oxygen mask',              reverso: 'Mascarilla de oxígeno',  emoji: '😷' },
                { frente: 'Pulse oximeter',           reverso: 'Oxímetro',               emoji: '🫀' },
            ],
        });

        await upsertActividad(m3_mom2.id, 2, 'storybook_chat', 'Storybook — Atendiendo al Visitante y al Nurse Manager', 'Dos escenas: Nurse habla con la hija de Mr. Thomas y luego propone una mejora al supervisor.', {
            escena: 'Pasillo — Turno en curso (RAP 4 y 5)',
            personajes: {
                A: { nombre: 'Nurse Ana', color: '#0891b2' },
                B: { nombre: 'Lisa (hija)', color: '#10b981' },
                C: { nombre: 'Nurse Manager', color: '#7c3aed' },
            },
            mensajes: [
                { personaje: 'B', texto: 'Excuse me, how is my father, Mr. Thomas? Is everything okay?' },
                { personaje: 'A', texto: 'Good afternoon! Yes, don\'t worry. We are checking his temperature right now.' },
                { personaje: 'B', texto: 'Is he in pain?' },
                { personaje: 'A', texto: 'He is resting comfortably. The doctor is reviewing his medication at this moment.' },
                { personaje: 'B', texto: 'Thank you so much, nurse. I feel better now.' },
                { personaje: 'A', texto: 'You are welcome. You can visit him in 30 minutes. 😊' },
                { personaje: 'C', texto: 'Ana, how is Mr. Thomas\'s checklist?' },
                { personaje: 'A', texto: 'I think we should update the checklist for Mr. Thomas. His vital signs are changing.' },
                { personaje: 'C', texto: 'Good idea! Let\'s do it together before the next round.' },
            ],
        });

        const m3_mom3 = await upsertMomento(modulo3.id, { nombre: 'Práctica y Aplicación', tipo: 'practica', orden: 2 });
        await upsertActividad(m3_mom3.id, 0, 'practica_dropdown', 'Práctica 1 — Nursing Checklist', 'Completa la lista de verificación de enfermería seleccionando el verbo correcto para cada acción.', {
            items: [
                { prefijo: 'I am ___ the blood pressure right now.', opciones: ['check', 'checking', 'checked'], correcta: 1 },
                { prefijo: 'She ___ vital signs every hour.', opciones: ['is checking', 'checks', 'checking'], correcta: 1 },
                { prefijo: 'We should ___ the checklist before the handover.', opciones: ['updating', 'to update', 'update'], correcta: 2 },
                { prefijo: 'Dr. Smith ___ the prescription at 8 AM every day.', opciones: ['is reviewing', 'reviews', 'reviewed'], correcta: 1 },
            ],
        });

        await upsertActividad(m3_mom3.id, 1, 'practica_audio_form', 'Práctica 2 — Listening: Instrucciones del Dr. Smith', 'Escucha las instrucciones del médico y completa el correo de confirmación.', {
            audio_url: null,
            transcripcion: 'Dr. Smith says: Please check Mr. Thomas\'s temperature every two hours. Also, we are changing his medication from ibuprofen to paracetamol. Start at 2 PM. Update the checklist immediately.',
            campos: [
                { id: 'interval',   label: 'How often: check temperature every', placeholder: 'Frecuencia...', respuesta: 'two hours' },
                { id: 'old_med',    label: 'Previous medication',                placeholder: 'Medicamento anterior...', respuesta: 'ibuprofen' },
                { id: 'new_med',    label: 'New medication',                     placeholder: 'Nuevo medicamento...', respuesta: 'paracetamol' },
                { id: 'start_time', label: 'Start time',                         placeholder: 'Hora de inicio...', respuesta: '2 PM' },
            ],
        });

        await upsertActividad(m3_mom3.id, 2, 'desafio_audio', 'Desafío — Doble Misión: Familia + Mejora', 'Graba un audio con 2 misiones en 1 minuto.', {
            titulo:      'Voice Note — Doble Misión (Máx. 1 min)',
            max_seconds: 60,
            misiones: [
                'MISIÓN 1: Saluda a la familia del paciente e indica QUÉ estás haciendo en este momento (usa Presente Continuo: "I am checking...")',
                'MISIÓN 2: Propón una mejora a tu compañero de turno usando "We should..." o "Let\'s..."',
            ],
            ejemplo: '"Good afternoon! We are currently checking Mr. Thomas\'s vital signs and he is resting well. — By the way, I think we should update the vital signs checklist before the next round."',
        });

        const m3_mom4 = await upsertMomento(modulo3.id, { nombre: 'Cierre', tipo: 'cierre', orden: 3 });
        await upsertActividad(m3_mom4.id, 0, 'quiz_multiple', 'Quiz — RAP 4 y 5: Comunicación en el Lugar de Trabajo', 'Demuestra lo aprendido sobre tiempos verbales e instrumentos clínicos.', {
            minimo_aprobacion: 70,
            insignia: {
                tipo:        'rap4_5',
                nombre:      'Clinical Communicator Badge',
                descripcion: 'Completaste el Módulo 3: Work Place Communication',
                emoji:       '🩺',
            },
            preguntas: [
                { pregunta: '"I ___ the blood pressure right now." (Presente Continuo)', opciones: ['check', 'am checking', 'checked', 'checks'], correcta: 1, explicacion: 'Presente continuo: sujeto + am/is/are + verbo-ing' },
                { pregunta: 'What instrument measures temperature?', opciones: ['Stethoscope', 'Pulse oximeter', 'Thermometer', 'Syringe'], correcta: 2, explicacion: '"Thermometer" = termómetro, mide la temperatura corporal.' },
                { pregunta: '"She ___ vital signs every hour." (rutina)', opciones: ['is checking', 'checks', 'checked', 'am checking'], correcta: 1, explicacion: 'Para rutinas y hábitos usamos el Presente Simple.' },
                { pregunta: 'How do you propose an improvement politely?', opciones: ['You must do it.', 'We should update the checklist.', 'Do the checklist now.', 'I want you to update it.'], correcta: 1, explicacion: '"We should" es la forma cortés de proponer mejoras en inglés.' },
                { pregunta: 'What is a "stethoscope" in Spanish?', opciones: ['Termómetro', 'Estetoscopio', 'Tensiómetro', 'Oxímetro'], correcta: 1, explicacion: '"Stethoscope" = estetoscopio, instrumento para escuchar el corazón y los pulmones.' },
            ],
        });

        // ═══════════════════════════════════════════════════════
        // MÓDULO 4 — PROFESSIONAL PRACTICE
        // ═══════════════════════════════════════════════════════
        const modulo4 = await upsertModulo(curso.id, {
            titulo:      'Professional Practice',
            descripcion: '¡Mr. Thomas recibe el alta médica! Aprende verbos modales, términos de alta y cómo reportar resultados. RAP 6.',
            orden:       3,
        });
        console.log(`📦 Módulo 4: ${modulo4.titulo}`);

        const m4_mom1 = await upsertMomento(modulo4.id, { nombre: 'Preparación', tipo: 'preparacion', orden: 0 });
        await upsertActividad(m4_mom1.id, 0, 'warm_up_drag', 'Warm-Up — Estado Final del Paciente', 'Relaciona el estado final de Mr. Thomas con el checklist de alta médica.', {
            instrucciones: 'Arrastra cada estado hacia el ícono de verificación correcto',
            items: [
                { id: 'stable',    emoji: '✅', texto: 'Vital signs stable' },
                { id: 'resolved',  emoji: '💊', texto: 'Pain resolved' },
                { id: 'discharge', emoji: '🏠', texto: 'Ready for discharge' },
            ],
        });

        const m4_mom2 = await upsertMomento(modulo4.id, { nombre: 'Absorción de Conocimiento', tipo: 'absorcion', orden: 1 });
        await upsertActividad(m4_mom2.id, 0, 'grammar_pill', 'Grammar Pill — Verbos Modales + Frases de Reporte', 'Aprende a dar instrucciones médicas y a reportar resultados clínicos.', {
            titulo:   'Medical Advice & Reporting Results',
            columnas: ['Medical Advice (Modales)', 'Reporting Results (Reporte)'],
            colores:  ['blue', 'green'],
            filas: [
                ['You must take this pill.',         'The temperature is normal.'],
                ['You should rest for two weeks.',    'The checklist is complete.'],
                ['You must not lift heavy objects.',  'The vital signs are stable.'],
                ['You should follow up in 7 days.',   'Mr. Thomas is ready for discharge.'],
            ],
            nota: '"Must" expresa obligación fuerte. "Should" expresa recomendación. Ambos son verbos modales que NO cambian con la persona (no uses "he musts").',
        });

        await upsertActividad(m4_mom2.id, 1, 'flashcard_vocab', 'Vocabulario — Términos de Alta Médica', 'Aprende el vocabulario técnico del proceso de alta médica (epicrisis).', {
            instrucciones: 'Voltea cada tarjeta para aprender el término en inglés',
            cards: [
                { frente: 'Discharge',              reverso: 'Alta médica',              emoji: '🏠' },
                { frente: 'Prescription',           reverso: 'Receta médica',            emoji: '📄' },
                { frente: 'Painkiller',             reverso: 'Analgésico / Calmante',    emoji: '💊' },
                { frente: 'Follow-up appointment',  reverso: 'Cita de seguimiento',      emoji: '📅' },
                { frente: 'Recovery',               reverso: 'Recuperación',             emoji: '🌱' },
                { frente: 'Outcomes',               reverso: 'Resultados clínicos',      emoji: '📊' },
                { frente: 'Vital signs stable',     reverso: 'Signos vitales estables',  emoji: '💓' },
                { frente: 'Home care',              reverso: 'Cuidados en casa',         emoji: '🏡' },
            ],
        });

        await upsertActividad(m4_mom2.id, 2, 'storybook_chat', 'Storybook — Alta Médica y Cierre de Turno', 'Dos escenas: instrucciones de alta para Mr. Thomas y análisis del checklist con la Head Nurse.', {
            escena: 'Habitación 204 — Día del alta médica de Mr. Thomas (RAP 6)',
            personajes: {
                A: { nombre: 'Nurse Ana', color: '#0891b2' },
                B: { nombre: 'Mr. Thomas', color: '#f59e0b' },
                C: { nombre: 'Head Nurse', color: '#7c3aed' },
            },
            mensajes: [
                { personaje: 'A', texto: 'Good morning, Mr. Thomas! Great news — you are ready for discharge today!' },
                { personaje: 'B', texto: 'Oh, wonderful! Thank you so much. What do I need to do at home?' },
                { personaje: 'A', texto: 'You must take this medication every 8 hours for 5 days. Here is the prescription.' },
                { personaje: 'B', texto: 'Every 8 hours. Understood.' },
                { personaje: 'A', texto: 'Also, you should rest for at least two weeks. You must not lift heavy objects.' },
                { personaje: 'B', texto: 'Of course. And my follow-up appointment?' },
                { personaje: 'A', texto: 'You should come back in 7 days for your follow-up. Take care, Mr. Thomas!' },
                { personaje: 'B', texto: 'Thank you for everything. You are an amazing nurse!' },
                { personaje: 'C', texto: 'Ana, how is the checklist for Mr. Thomas?' },
                { personaje: 'A', texto: 'The vital signs are stable. The checklist is complete. Mr. Thomas is ready for discharge.' },
                { personaje: 'C', texto: 'Excellent work! The outcomes are very positive. Well done!' },
            ],
        });

        const m4_mom3 = await upsertMomento(modulo4.id, { nombre: 'Práctica y Aplicación', tipo: 'practica', orden: 2 });
        await upsertActividad(m4_mom3.id, 0, 'practica_audio_form', 'Práctica 1 — Listening: Discharge Summary', 'Escucha al médico dictando las órdenes finales de alta y completa el formulario.', {
            audio_url: null,
            transcripcion: 'Dr. Smith: Mr. Thomas is discharged today. He must take paracetamol 500mg every 8 hours for 5 days. He should rest for two weeks at home. He must not walk without support. Follow-up appointment in 7 days.',
            campos: [
                { id: 'medication', label: 'Medication',          placeholder: 'Medicamento prescrito...', respuesta: 'paracetamol' },
                { id: 'dosage',     label: 'How often',           placeholder: 'Frecuencia de toma...', respuesta: 'every 8 hours' },
                { id: 'rest',       label: 'Rest period',         placeholder: 'Período de descanso...', respuesta: 'two weeks' },
                { id: 'followup',   label: 'Follow-up appointment', placeholder: 'Cita de seguimiento...', respuesta: '7 days' },
            ],
        });

        await upsertActividad(m4_mom3.id, 1, 'practica_dropdown', 'Práctica 2 — Leer el Checklist de Alta', 'Selecciona la frase correcta que describe los resultados del checklist de Mr. Thomas.', {
            items: [
                { prefijo: 'The vital signs', opciones: ['is stable', 'are stable', 'were stable'], correcta: 1 },
                { prefijo: 'The checklist', opciones: ['is complete', 'are complete', 'is completed'], correcta: 0 },
                { prefijo: 'Mr. Thomas', opciones: ['should rest', 'must rests', 'should rests'], correcta: 0 },
                { prefijo: 'The patient', opciones: ['is ready for discharge', 'are ready for discharge', 'be ready for discharge'], correcta: 0 },
            ],
        });

        await upsertActividad(m4_mom3.id, 2, 'desafio_audio', 'Desafío Final — Recomendaciones de Alta + Reporte', 'Tu desafío final. Graba el audio que culmina el caso clínico de Mr. Thomas.', {
            titulo:      'Voice Note — Evaluación Final (Máx. 1 min)',
            max_seconds: 60,
            misiones: [
                'Da 2 recomendaciones de salud a Mr. Thomas usando verbos modales (must / should)',
                'Reporta en una frase que la lista de verificación fue analizada y completada con éxito',
            ],
            ejemplo: '"Mr. Thomas, you must take your medication every 8 hours and you should rest for two weeks. — The checklist has been reviewed. All vital signs are stable and the patient is ready for discharge."',
        });

        const m4_mom4 = await upsertMomento(modulo4.id, { nombre: 'Cierre', tipo: 'cierre', orden: 3 });
        await upsertActividad(m4_mom4.id, 0, 'quiz_multiple', 'Quiz Final — RAP 6: Práctica Profesional', 'El quiz final del curso. Aprueba para ganar la insignia de Care Evaluator y desbloquear el POS-TEST.', {
            minimo_aprobacion: 70,
            insignia: {
                tipo:        'rap6',
                nombre:      'Care Evaluator Badge',
                descripcion: 'Completaste el Módulo 4: Professional Practice',
                emoji:       '🎓',
            },
            preguntas: [
                { pregunta: '"You ___ take this medication every 8 hours." (obligación fuerte)', opciones: ['should', 'must', 'can', 'will'], correcta: 1, explicacion: '"Must" expresa obligación fuerte, necesaria para la salud del paciente.' },
                { pregunta: 'What does "discharge" mean in nursing?', opciones: ['Medicamento', 'Alta médica', 'Turno', 'Receta'], correcta: 1, explicacion: '"Discharge" en el contexto clínico significa "alta médica" — el paciente puede irse a casa.' },
                { pregunta: 'Complete: "The vital signs ___ stable."', opciones: ['is', 'am', 'are', 'be'], correcta: 2, explicacion: '"Vital signs" es plural, por lo tanto usamos "are".' },
                { pregunta: '"You should rest for two weeks." This sentence expresses:', opciones: ['Strong obligation', 'A recommendation', 'A question', 'Past action'], correcta: 1, explicacion: '"Should" expresa recomendación, no obligación fuerte (eso es "must").' },
                { pregunta: 'What is a "follow-up appointment"?', opciones: ['Alta médica', 'Medicamento', 'Cita de seguimiento', 'Turno de enfermería'], correcta: 2, explicacion: '"Follow-up appointment" = cita de control/seguimiento después del alta.' },
                { pregunta: 'Choose the correct report: "The checklist ___"', opciones: ['is complete', 'are complete', 'is completing', 'was completing'], correcta: 0, explicacion: '"The checklist is complete" — sujeto singular, verbo "is", adjetivo "complete".' },
            ],
        });

        // POS-TEST
        await upsertActividad(m4_mom4.id, 1, 'postest', 'POS-TEST Global — Evaluación Final del Curso', '¡Lo lograste! Completa este examen final para medir tu progreso desde el inicio hasta hoy. Se comparará con tu PRE-TEST inicial.', {
            preguntas: [
                { pregunta: 'Which greeting is used in the morning?', opciones: ['Good evening', 'Good morning', 'Good night', 'Goodbye'], correcta: 1, explicacion: '"Good morning" se usa desde el amanecer hasta el mediodía.' },
                { pregunta: 'Complete: "I ___ a nurse."', opciones: ['am', 'is', 'are', 'be'], correcta: 0, explicacion: 'Con "I" siempre usamos "am".' },
                { pregunta: '"Yesterday, he ___ at the hotel." (pasado simple)', opciones: ['fall', 'fell', 'falls', 'falled'], correcta: 1, explicacion: '"Fell" es el pasado irregular de "fall".' },
                { pregunta: '"I am checking the blood pressure." This is:', opciones: ['Simple present', 'Present continuous', 'Simple past', 'Modal verb'], correcta: 1, explicacion: 'La estructura "am + -ing" es el presente continuo.' },
                { pregunta: 'What does "discharge" mean in nursing?', opciones: ['Alta médica', 'Temperatura', 'Medicamento', 'Turno'], correcta: 0, explicacion: '"Discharge" = alta médica.' },
                { pregunta: '"You ___ rest for two weeks." (recomendación)', opciones: ['must', 'should', 'can', 'will'], correcta: 1, explicacion: '"Should" expresa recomendación.' },
                { pregunta: 'What is a stethoscope?', opciones: ['Termómetro', 'Tensiómetro', 'Estetoscopio', 'Oxímetro'], correcta: 2, explicacion: '"Stethoscope" = estetoscopio.' },
                { pregunta: 'Complete: "The vital signs ___ stable."', opciones: ['is', 'am', 'are', 'were'], correcta: 2, explicacion: '"Vital signs" es plural → "are".' },
            ],
        });

        console.log('\n✅ Seed completado. Tablas pobladas:');
        console.log('   - 4 módulos con 4 momentos cada uno');
        console.log('   - PRE-TEST + POS-TEST');
        console.log('   - Warm-ups, Grammar Pills, Flashcards, Storybooks');
        console.log('   - Prácticas Fill, Audio Form, Dropdown');
        console.log('   - Desafíos de audio y Quiz con insignias\n');

        process.exit(0);
    } catch (err) {
        console.error('❌ Error en seed:', err);
        process.exit(1);
    }
}

// ── Helpers ────────────────────────────────────────────────
async function upsertModulo(cursoId, data) {
    const existe = await prisma.modulo.findFirst({ where: { cursoId, orden: data.orden } });
    if (existe) return prisma.modulo.update({ where: { id: existe.id }, data });
    return prisma.modulo.create({ data: { ...data, cursoId } });
}

async function upsertMomento(moduloId, data) {
    const existe = await prisma.momento.findFirst({ where: { moduloId, tipo: data.tipo } });
    if (existe) return prisma.momento.update({ where: { id: existe.id }, data });
    return prisma.momento.create({ data: { ...data, moduloId } });
}

async function upsertActividad(momentoId, orden, tipo, titulo, instrucciones, contenido) {
    const existe = await prisma.actividad.findFirst({ where: { momentoId, tipo } });
    if (existe) return prisma.actividad.update({ where: { id: existe.id }, data: { titulo, instrucciones, contenido, orden } });
    return prisma.actividad.create({ data: { momentoId, orden, tipo, titulo, instrucciones, contenido } });
}

seedCurso();
