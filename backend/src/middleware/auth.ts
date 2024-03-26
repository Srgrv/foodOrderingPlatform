import { auth } from "express-oauth2-jwt-bearer";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

//models
import User from "../models/user";

// Это специальная конструкция в TypeScript, которая позволяет расширить глобальное пространство имён.
declare global {
  // Это определение пространства имён для расширения интерфейсов, определённых в Express.js.
  namespace Express {
    // Это расширение интерфейса Request, предоставляемого Express.js, чтобы добавить новые свойства.
    interface Request {
      //Это новые свойства, которые вы добавляете в объект запроса. Оно предполагается для хранения идентификатора пользователя.
      userId: string;
      auth0Id: string;
    }
  }
}

// Таким образом, после этого объявления, при использовании объекта запроса (Request) в вашем Express.js приложении, вы можете обращаться к req.userId и req.auth0Id, чтобы получить доступ к соответствующим идентификаторам пользователя.

// функция для аутентификации пользователя, здесь происходит валидация на auth0
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

// функция для авторизации пользователя, здесь происходит декодирования jwt токена, так как auth0 возвращает jwt token на основе логина и пароля, нам нужно декодировать используя jsonwebtoken библиотеку
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // достаем токет хранящийся в headers в виде Bearer adjf;adjf;ajdfa;dfj
  const { authorization } = req.headers;

  // проверяем на отсутствие и отсутствие начала токена на Bearer
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  // Извлекаем из токена все кроме Bearer
  const token = authorization.split(" ")[1];

  try {
    // декодируем токен
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    // достаем из декодированного токена sub и присваиваем его переменной auth0Id
    const auth0Id = decoded.sub;
    // находим пользователя по auth0Id
    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.sendStatus(401);
    }

    // добавляем новые свойства запросу в виду auth0Id и userId
    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

    // передаем управление следующему middleware
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
