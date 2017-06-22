/*
 * Copyright 2014 Dominick Baier, Brock Allen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace Todo.IdentityServer.IdServer
{
    using System.IO;
    using System.Reflection;
    using System.Security.Cryptography.X509Certificates;

    internal static class Certificate
    {
        public static X509Certificate2 LoadSignCertificate()
        {
            return LoadX509Certificate2("Todo.IdentityServer.Certificates.todosample.pfx", "todosample");
        }

        public static X509Certificate2 LoadHttpsCertificate()
        {
            return LoadX509Certificate2("Todo.IdentityServer.Certificates.localhost.pfx", "todosample");
        }

        private static X509Certificate2 LoadX509Certificate2(string path, string password)
        {
            var assembly = typeof(Certificate).GetTypeInfo().Assembly;
            using (var stream = assembly.GetManifestResourceStream(path))
            {
                using (var memoryStream = new MemoryStream())
                {
                    stream.CopyTo(memoryStream);
                    return new X509Certificate2(memoryStream.ToArray(), password);
                }
            }
        }
    }
}