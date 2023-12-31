import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Input, Image } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAABF1BMVEX///86dvD//v////06d+w6dfX///w6du/Q3PHN3vApbO79//k4d+4vcfL9//+Or+mOr+j///b/+v/3///7//w8dPU+dPA5eOr///M1ePP7//r/+/ry//9Bc+02d/U1ee83eec7c/vg8vnr+v8ubuowZ+e1y+sxb+F3nOU7c/zW5fsubOVwkeEycN+NqevT6PdMf+JwleylwfCtxOygue/B1fAoZOhIfOZ/o+Db5/RSeuw1euM9ctQnbPp4nOnf5fdXgdRKftu+z/ZOesymt+dgguyjxOpljOCCp/Ds7/peiuyQsN3G1fNnj9k5ctqtxfI4Zfu83exyh+x4ptyYsvRajNhVj+h5oPG4w+Wx1vF/nNxnmej//+n9bmjYAAAeM0lEQVR4nO19j1/bONK+LVkS2LLAsS3jJCh24iSACUkTQqA0bNNvD1ra0rv39vZuu+///3d8R6a7t/cev8I6Dp/3vVnaZiHE8uPR6JnRaMYw/iP/kf/If+SPihAYISEoFQihNVwfY7g+DAAZGGGK1zCCAgOMHQMhSrHwm8PNyfFWZXL8fjIdNn1BMfUoRdih63gMBiiA1gRs+MPJ6exkbmecuVVJluV5djI7/XoWYIoCUEWxDgwcx6E1Ixhuz/JckjiyTKIsblkc/tz+9dvrPyz/9omSECK5mdnd10ebwvNo4K8DA4Go6IxHJ2mchqZlkZi3WEiqERVFrRaXJufnUdodjTuGU7lBwA5GHu1sD3JmmsziJiGcmdK0KhIWhloPGGMpiVqhPTjuGA0n0DOzMghAB2jz05uMmC9CLOW++dQUDRRUtz7AehRMZxkJJVv37RfCwDy451MD+7gyDLDX+ZbB/TPrZWCg5K4MSf6toxGoCoXNmRsD/GABXogwMEeR/XoTxrb66YBqATUmOWkxFcuXggHT6sgls7qX1MMI6NtKmSsOauJTtu6bvle626LmFQR6hSLqaG9urftW7xMZuhfCoTQQq6SNSOzNk3Td93qfMCtSe0IEdLXM+dRumS9jNbhLZCzzU3ClVjYXUBMZ27ZpvmAMQJh9bOzg1YFg9LrrvsXHxTrpGSsjzUGjnYXrvsPHRbX6PzScFWEg/LdutO47fFxklIyaKzCKmnhgY2se7a77Dh8XcCjtLe3UlDwfHOQIvHGjmFr3HT4unBHWPwDftuT5IKjhiVEacr7uO3xcmEnI7iKo1UtWBASK0MtjxuJ13+HjAhiExO3hoGSnAfvUH1kRVy/ES3pIpARnrjUrPZbg+HhiE6lUea6CvHX3ZIGqDpFK7YyXgLGUjPFkPqGYlooBqhsLVSY9ZEzHA399zVqtKLIUfLOs6BxLF36jZHtAN7qtMjHgFo9B4NGDmWWmAjWQ5FYzShGp8qlXNmE+3S+VHimXZK7tuq6dZZlt51K6WgVKA0Eyd69kpyH42LdKDSKzaPHLh0+TyTstk8nxh8PFIGJK049SYFCMDDrlzgX8zrbIswenWUUEWs9kK7bTwhIu/NvAH6ZU/wtfovkT0RtI2Tw2wTiYLCZ/IGwd7XNbu05l6sIeI88OIjMFC7beHXPd7uLo5wXYfnnj1zzjn6SeIur4b1IehdHPR//PTkO5K63kD6heMk/cPb05XR4G/o0VPn9Z5EkSmTzrXo8PfMN7BXcm+2dAu37DAFPkOO08jK10Dzv+2fs/2ZyHqXq+CbLCc2L5gEB5hHnYZc+fCqYMQ9fubw8F8rzaztiFb2Ub6HdODTwuKjZsMAfuJWgEdYLhj32wQOmzL8lYJO2zAJfoNPRSxcnzfQXXvpr6BkINuHF6ZoPZsyfG7wMd2h78I4tMZQ9rfqCTOqiYXuXPZ0ygRjybBDu1UuwiprjmfHCfaZ+slCTu4HTT0Ekj8FAcD/s3qbLsbf/j2bQ3uRwfjye93vSHj/77DHjCTYcKofcHtLd+sGcTbgGFWp4+wu+w7IPhleQ36cl6/dwn0mpZ3cOhwNroOfWgGNEp4yw9X9hzN8++Z1TwbHCu7Q3ZM3YAdLqzE4AqYP/swiYhL1yA5UVegc9fjh4I2hD9Z0Jg8vy/DvCOVyQtgYZjozP9NAKVClNTWRaww13O9R76fnobnZkdfe4Ix6ghGgA53TGMsy8ZeyYG5sAIyslPAXPldPLnYmC/82AW+KDdjucYnd5efz5PSSitgg/FAICmzHHCokIPzJjkN4e9jg92sZg9wY7/LmPPxCDvlLTTgBF2Dp6xu1bYD5ZdYs+D2Y0FNjb2+i5RPLISGeo90kg/XyUZ51YICp/qX7DkvjLt/t6GMGAC0QDVjIlbOJnPwCA7w04pGCCYygf2klfnKUtCM1LnpN/eEQI3jObl28zVqUW88JBB/cFnAFMAJsG2U1fxFifS5IokCVBENx99bcJviXqtPTBDyzK5TJfGwT6g5WzFaww2lsYgkqmbWUnI0wuj5uHmZdQNlWnF2kGMZGjbWZ78tHe6PR5fXo63t/aurJOT3JTEitL9XctUZt++uWxip+b9PZOSK9eOk6VJmr1RksegMdhcFgPSSvOfx39mscWzDep/TdwwjCOLgB9gqnk2Op1sdEThJ/w6SuEffD0d5XYWRVxHBE2Lu4Ox723aSvI4H/f6PF42oJuViAFeGoMwezv06q/cSCbm4udZlu7zCG6OpPvdm2/vPhpUr5NI1AMwWiIIAscJAuwYfnt69HrOWsVHhKyVLf4yA7tpul+EN3xtLqsI5emBsxwG4FuxODuseajRvFHg/MRZyKIoDAlYyDcfpj41aN0XhZ1EtwIXQZow63+c5uZRPwc7mbBQxqEtSWyp/KODaPPQhvV0GTdKY1COPVgWA8Zl9s13dJLY9HZ7kpuhjIhrLyZN8YQgH/bfXduaH/JiReQk+4yF8IT/1+7SGJQTWF0WA65aJ8dix0FGUDfea/9IR8p2ZX41FaD+FD++WtUcZ/PVnMe3rqqyP8H6gFFNiE9ZmCzhtawNg5B0x0YN+4IKera4ZQmmyq83fBhQw3lKrLcuaoY3vOpahRFUfDH09LzxkDFeKiVyfXrQPd5pICTg6l/z6HbI9uwzMO4GBc4sjMejGjoTPnC86euCmklu5RPN2TFAM15m838dGPAIXOzuGNcErdeR2LZTyTkQwf62oAgIj6FTxp6AgQEzBqGa47/vM25Jkqp8y3ccMAmgCTYxnxrKWAcGjDDW3fJ3kAgQrV/0OQGDxt3FUFDnOVlSyBhenwDFiJjK95waLCZYZ8JEYevlYqDCJLsQOzsI1WviytUh0pT0t4QDk+N5mWJUHOdxbFqw2v6Xj/R5FWT8dT57Illaiz04T6+btDjh0rzKGNGR5Jup3rlH6Fnpo9hBzuZuOjeBYqqf6uDGA7lA1+qJ2TBrsQfqTcejcL+Gf5VGoaUIW7Rh1Dpb7nljAQMg2m/3Y55G3L7yC2+60Rk8cXFYBwYyH+4gHOCa/8WWoRUR+9A3NCkAL/i5lxfUaO7NW4yQ0PwFDAIwd2/4xMVhHRikW0CDUT2of8tgFpBwsOcHJQwANY/mlp4N9p4eDlCoH58Wz1jLXBiMDWenRj/NCdjy0P5mlJEfBtakfmRzcDzS/hi8Cuq8f2Jobx0YEOm++rhjvJsnemM5P4VZUMY2D601gq3uPjhelv2ujjqHf37B6wKTKrvZaPdbzCJhfghcz6n/8QFQoNjIP7W156UG7U0rKc5OPIEnVYyBJK1QU5fzOLNgeFboXgO3xU9wkB4VrB1gKl4pEkrJoj4BW7ObsOhxZagYAybPr+0kMeey8PUsNSs3TTJAzVGL6TQbxXZ3eTS/th4nixVjwNPj4KsOmobF2h0ODnAJ0+CfInboWb84N8NgxXHzr/XL9KVhoBZ+DXdOu1ZSzNNuT0dSy7j8dwHf2Zh2mU4wMdnNadPx/NeP7jlUiYE0md3zEPCj4SzUxir7hr2g1EwYHNQbxpErTWWS2VB7pmJqP5azUiEGccjjBRA6IMlnXasVWuSNv5LzA/4sjcwWydtgbQNDLEL2cFCpOgyYZK2TqUEBA+eVZbE0Opmu6AzFZp9zrqxDXXPAMKZ2K30QhAr1QFrxnwIKGDjT+bnea99b0XHTGt5KlRnz7qaj/Wh/EaUPToYq7QE/6RWXEtcqCmWUt0vPDPw+FHAZwd4oBh4kBUe6lz8cZq4OAxlb3Sb4tIhOu5FpWfPxiiAwUEAvbW6l592pX2xn95MXggEsVz96AtVr+EqPKHrdXBUGhvD8EUn2I3IFLnVDGNsP+49VrgsnbfDqkTcsshTciRGs6JypIxr4ZztWluxuUiTqxln3wbMEFWLQug4Agxo9Tc0i87Dhl8sNfhNYDagYqZaM3W/gQYC6XT3oNFS4NmY9Q6fO3CaruO+DuljRyTqB4JN7WQv4yKAN08/H/3jw4VSDgT51IPOOjhM4XzNLpUn+EZcQO7pPBNx4PwJulF1SjITX6Uvz/vzZajCQIO4h1udmnGsYW8g/lHHNhwRvZYqx8G/AltGOOCTm/cmsGoNycnEewkCHDbMeBQxouwsGm59slHt45N8EOwcnsaWAMINHgnHPju/3GqrRA24SM2878B5jbFspa82CVZ0w/S7YEwuTS9O+pEAWnXYXnsJ9hLkim0hCPjI8ffrx2iRJmP244mP3On1nbO9yU14bRdLZLJLkvvyUiuwBIdZPw46BaadPpMXsH1ZetMtB7XlihirXRzRqm1f8/uo8FemBlMya51fjzV6f7JpqIFaOAUb111zu8qy3cfxTP8tUzNeLAdPJhq2WxfoDc5fF6alR8oG6O8ZDvW1XRi3luswMU9J6eF2oYC7o+kyShGGodDR53ls9BjhwpjazFCcReCpREvF7/aaqOBKsDLp2GzetOE7mbbzquQDrAjBSS6bJ9+htGq57LsjE7mf75q1CtmTdWXVNTazTeUY6nMqBlpLMHtwfS6pqbYyOeltfZvm+/h/+Cpd0YOAB0RjsaRVQfDB7tdXbdu/1m6paG/MN/ab6kfbksy0Y4crtAfbx8e3VfMPzjI18zRiYDFgi3UHO3/WTcXt49RgI6nufddoj+yt4A9Q5u//UU0UYWEBVkFe7PexjT3WUr4yLPiAC+96BzaTpXlFqBOgjv/eAcEVzoXXTBNcMi8JKZWdBo5Larh9zK5R85ogaDfw398aSqsJgpLeXhZ9oDPKPgEEV9Qs7kU746geihgNjcR8ElWGwKNLQ/CKGZHVKOkP1mPgLJTnLfVET68dARVcaA9HRhlrORL2cmMVjIt66zIq7H8E7cYyrNWNgslcGmAOjrTPF5CgIKipo+pYwbuZtQxcAerVmjmS5hzrDGrXzAgMfVaQIVzI2Zd5GAaqvHQOuMcDinxgE1WIgUPB/FoOFZIz9hsF9JKmiuRBeGXDbqNhbkLOq5oJYgD1geaeYC1et9WIgzSvdBwH7OmtSJr5T0iGqR8SfsZjxvIkdgen1PWOrDoMFBr4aoIIj9Tt18OvKuOiDgnGnz2LJLJ86ohGM1u0zyXNfR/hQwZXzswCvHAOdAN7JdeE2mHo0QM3IXG9s3VL9j5jqSVn4C58FWj0GlIqDnIHbfiUQdlBnd80+U6TyWwyKqIb7DwOt2m8UATXENNNZen+HkXmona15n8lM7E0H06C5VUQ1jhyx8mYQ4Krj27IyW03dCGJjsO44UuRu9z4cjvpFNr0mzsHqMXBwoXWEv9GxtC1578meqmwiUBWLhKowS1a/aayusvGtCAMFt9EKuGrqZv3+uvdYrDBJyW8F76yTYUmb3feLMGhQeKmmlVhMmrFp3ZuAUJFNDM9DqQ+tKJ1RHu336OoDCI747ErQu1iRoqiGueY9lqJ4KSdpmmWmtZ+4e15t1RhQamy7YcLCvi2ZAiVs3dsGoioMOOf54PD4oGdHJklvgLaUcdH7BRiBmCmTRSc/D8c/7faV4vfWfK5qz5VbP212hOF18laUpvnmyrcXgBGcMC5b3aZj4GB4FZnhenkiNxUbGfroJf1bmqjQ3V554zRkXM4tycgVDgIgIzNLrh8DmZ8J6mA8zixOdAhBrJYqInwVRmHkjnUNKdrOY73vu04MtLgTWhOB98MAHk6UbzqAwSp5kgPOAkyFvK0LMDpf+w+Uva4OA/LK8VDQCK7NiMTRBdapUqsDATtHPAk5/5MPC0QDH0p1f83jCnN1846HKNr5mjMSWydt2lglBoafs4iY+QQXCYF9ou4vxlsdBjyfgPIL3OkTkpDsvdhBq4ywTzgwc243Yf4J3Mv06vwC9MC6Dmo7gU/3bJgNfOA7q0pGEboE68yUhLG/79QcgY1DeHl/TeYKMeB5GwYkwFhpLzYDg72ihUHAnOvZOke6O3R0Uc6z/gvJ3Wcs+xEostgRV0TtmuoGrcqBRgH1RyEwY/cqqOkmE1v2CznTxXiYN2sG8ujnvtplhB8/pRjWc8RD+KsN7jrPpw4CnWgOXsqZLmYqG6w08gPjiybyYb9TPlksDEy91rnZ1VlwPwksKKJf3ejByigV2gMmyVudSY/odJ7I1m58Ub4aIMOhmNIjl4dJa75pUA954k/q3i2mqjFQu2QwNSi4DcGrfqRk/LaM6/6rYArMGG/eEL7L0y8+QgJ5n/MWeynn2gjo58j3RB3tnHVjFqrt8vtkObq0rT+KQOvCbtujQptHlfCXMhfACCi7d2ulusoK+5/LD6iBg7QTbNskknH4ekidhuf1shhctheCAVPcssfAlmt0I0uk6rfLqWb7e4GpID5nu/vnsCwk9l87Bm2+Bi2412WsGoMoJTwfenVR8340FYtnolH6uoAdenYTh2Gk80JjPugFl4/XaKnynKvkcd9vCNEQr7jJyIenlMZbdhQNf7FvSlOl+gyVtLLr2eOtoqq0iVZLvYIJi51mv6UPgBvl+wsN/8u8ZVrcnGVxq2VxJcnjFQSrPOsbqXysMzWN4YnF+En7mUXyHhJx6kpd++CmPV2YscWS6AnVx6v0maK0PzQEdegk5WYkm43yMMBYCN2g4ihPE7AGJ++8nY9fbMLilDzepKNKexClu3/tDX2MLxQjyaFR4rKgW/SiWv0oj2HxkfYY6wKd4/xp3XuqrAGRqH03z9/sjV+rKGRjo14WQ9LskDZqzQ9dQiSL7AuNgFdzPry4mnFhlLR0CXmShSpR3aERlOUvYAfVUOAfZmAK5Nz+EtR8ROv0bPAkCCrlicWGY9E0hHDebaLyegvrcszthR1HMortL03UQLhhtF9gDUkZk7lKopapLMnZdfDreR4kgkAE+J/VxJcSXToVg0ZNb2TcUqEFEDgwERD2r9KXV0uUtUaHb07+PCdmHHP3WI8T32IA/nQNCV+Av7O0mRSCUtzwj3OYa2B254fNmv5cKr7lD3tK68CAne+fiuZwvDfTxf3sDXiAdW0QdBEjRANM8Y6nC4UveV3wFDE+u8piQqxQZXtNVMPUw8Z2VyVP7ExSZS2Q+TsPY8/5OQ95nHco+p6UJGDMHjVE+/N7ny5dPa3meM33AxaCseFhvlVvIFgUsP/ethRJXhwGbDB0dJmOT9F+1LoW2sm7/VVq+D+821rktj3qLZ2/SsV0kSmTKCDG/Z4+vaXLl4+7sS5W+/IweK0TxALjWrGUbxuG5xUHesTZZC/J5yyxLDPMrjd18McpjATozB1Dgx8HjqfrHgnUwOIvX05SRkjLMncXP9C68AAGcZkrTthTGxBUGVN9JYojd/3o3LQ/6/An/rjx/pfkxHaL5ntpqnvQnFxPhSECuEdN/e5YJfQJVr2V7DiU+ptfchnCegsEme9vBbjmBMILtk7UMt0DK9SD7CvWe0Abfblv9TvGx+n2dZb1d2WUnJuhIrH2b6QZtezZpKbtPdyp491xpaKSuK5G7fcWGU9Vi5ut/dAyVXfTq+GG55/m6VIdFKvE4EAfbcNj07Ii9mGUZ64C7SdyPzRjk0k31V6uDMNWy+1/mwqqS3HfuUpQDxDwp0e5LVXIk4QpNk/O1fl+vyNErfm3eTJSy3Q7rZIj+YZupnwB1ors7uvuapxIbvFI6vZLV5/eLTKpK6FKGXH35Oa0177LQBbfak9PZ1kWK2Jauu9lNpou9q0wcg8NPBy5EQmXarJdZj8W497+TJzDc76C2Wo0/HNTxbpncRi1iq1glt98u9zUD9zv9dOY6w0iXbSBZd3Z6eW07esfYZj+WFMJv7M5OR31M6I3klvcalnEffNV0L+c6Ca92XEPCPKyzRPtzZJ2f7Ue3IuB1kz3GMN76FkehRHXKask1HuC5uwMnkGj+AjaHN9krSQmURKZqhVL2e3mg+u9o63j8Xh8vHX06trq2ul+KplZNNJOQ5nPxh0PBcYFOCSSDfrgPC/dp6s0DAJEf7gXA7PoBAUOgjNxo33dhCwbdH/5Sf/MAn5fL4YAXNlrTkYnZpTGABMsbpJoXXFvexvD3y0eJcl5pNMtw1DBV380ae4A+n7j4w3AYsZKyqV7zdtnJaWMIiqcs/v8dalV3tfdGY1TJTO3P/rlx2HT6xVZ7Jv/XbtlS0GdAkr+5kVXNyxjoWRA/QAuK4qsW2FgMuHZ8whgIDwbnG6ACjWAFYiGM84AA32we2kMsvIwQE4n43cX9yZwJzMawFvEIH99OjnzDQfuvJ2bXLpjWvMKl7Gm2XMd5n2n96Vvu5EKVctiREqip40WDoAAItzUhS0uep2iAw24GEFDBO8yvYsTq3jpBtjdplMOBjrFSvRbkbyrrjVhSh4auqa432vf1orTEUAxShPCTo1GsGP4bTApukQILtymzvRopn/TikNYJgph8B9Ru8WW0Wx7CgDcZjwGgINxcPWMvom3InOjpHSQABmeuIb5eKcesFiOihIlCP83rRUYOJ5DL+Y8jGbN5sH4W/fktK33pHUcwSnI8LeBMkP+Js/szNb9zrMsn9vfe5leYHC9fU2XHFzDxtlFvnSnun9icA2DL2VtBJrh4KPs7mg+0DbV79DAp07tu3sMf9fQZBClLLnKT+xUmbvZ3tAwdryG7teDUGeQphb/1Px49rk3mUyO308mvc/Dtq8Lg8pBB9V1lidFDScY7nVlap4/G4NT3QSkFAwoPOPLnER3mSQZMcI+gaIguuMFxWSgOPA7l3mSqpDx5FwbEot1X02bQs8I6tWHdigt99JAt013qRZHUKOnD+j0h069Bm8TRrN33bVaMpL7z20s7fYMv5yonm6nhw/66k4MwF6ruL/h0VrRKQUbonnw9dusm4HLxy2w8Qz4Ipi+VmTfvD8ThuPVxIS1Inay2YCFMwARt72Ma5qIcWa/R+AlG/7wUzcDkxHymD2rvzgYWZUflBjZBNN+Lu/f4iX9r75HHQre0vvD3W5GlLpjEUnT/Or9mU93fimOQrapqKPfBCYc/pjHnJM9p+4fvF907ef3t9ZiAW+/Kbkmx14W3he8YZHKFsfvJjpY4sp7yRxojHKzt0dTfdxADpoNUC/dvLIQ3bfHfyNDRvq97ZFtJlb4BzFIE/eiVAQM411GovvuTgd29s0MaLL2D6V5d/KsZYF+8nRepBTKka/35vQnFwne8FL4oyxkLQusaMTCeJkehXcID5OsVy4E9GP+QAALpm3CdMvJUPs1mgDe+SYCFNA6v+0hIqM/vfr7J1gRtEwm2x9ejcAl4FyCsbBCws30j+mBYlZRYLFEQc6FvJemwQMuksdjsH+3HuNd72T62A8wvu/tqlsxJ1nhL8Aft28VVFiXZy1K0MEEe+5qcCt8N74oOw3CmT5c0vqlCZf5tOS8MIr8xcM5oS9MpBqVnwlCe8/m7esQmb8rOzEMBcgfLdNKdd3CZjqIXyoG4H8FPTsJl+83Xr1YLIysvOcEJZezBKbv+W+VutOBfmHCdEz3rU/9ktcFHURwfnisB8zLEBLKOD8Az61kDHTtGw9v95eP6VUvRKps26Ci9IRhB/w7xx/dnq9+uYtkMTIejnxdNKj8DEFQhp1hrnRCxIudEFxnMPM4P3NWdeK45jm9LtD55QO8VYksdui6PVFb1XFjx28Yn3QQ6MXqgZQRCU8+PbeL8BPE0zGu00w9niC6NuFRmp36DbqyuYAaTr0RfHO168eW3vhatXAzZrpW0bemTn5a5alzhJrf9nWeGHt2yHs1wrgChqjsb6KxwtsvRDQ9sX3SinRuxMsSzndlKz8KnJUXrcMN5AXv8zT+gzGO8oWBORxMcAP44aoxQMVe/Gzw8Km6NUhouaOh3rRYfRFLASYXOZ2Lrt47IRZX5I8F/v6gcL17wU0S8zDf6+gsn5UXZPmOg+6m+trmxAL/xHpiwuRqRJrcsmK2K92b6Z3ZbqsDAdNG81N3npq8RdJ1YhDKJFKSZG+OfVxbGTu8QxASujVfZ3uQxXdtKVUonDOS2v3jjkGRt1NJTd9fQdD1hGte0Jksuu5aaaNluv23lx1KhUGL3arqRPdg131lDeNga5bnphVp3siAPeov9uuL37/WL7j++pdvscd+h/3ubd8/Av6xLM5aiZXZ9mhrw7/dF9Z9havE4FcRzo5XP/t6sXvSte3UdquS/dTunvz59bevQx9UoEpT+O8SoFoNtAHXm8PpZLy9ta1lC2R7+/vXb69//2Lr9qdb//r69qfFq+3/8ePbX/7+EfD38fjrdNjUJX31pv9aIdB5Q4FTZOLs6FR0XJEYxQFoBNcDarzqyp2PCaa40UC4SDaCBXNV90z/h+AAF6kbAq6ORb3K5eBhqaj1wr9fq8Lr/kf+F8v/B0d6KDruu81bAAAAAElFTkSuQmCC",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
