﻿using System;
using System.Linq;
using System.Text;

using Microsoft.Practices.Unity;

namespace BugTracker.Shared.Extensions
{
    public static class UnityExtensions
    {
        public static string GetMappingAsString(this IUnityContainer unityContainer)
        {
            // code from https://msdn.microsoft.com/en-us/library/dn178463(v=pandp.30).aspx

            var stringBuilder = new StringBuilder();

            stringBuilder.AppendLine($"Container has {unityContainer.Registrations.Count()} Registrations:");
            foreach (ContainerRegistration registration in unityContainer.Registrations)
            {
                stringBuilder.AppendLine(UnityExtensions.GetMappingAsString(registration));
            }

            return stringBuilder.ToString();
        }

        private static string GetMappingAsString(ContainerRegistration registration)
        {
            // code from https://msdn.microsoft.com/en-us/library/dn178463(v=pandp.30).aspx

            var registeredType = registration.RegisteredType;
            var registeredTypeName = registeredType.Name + UnityExtensions.GetGenericArgumentsList(registeredType);

            var mappedToType = registration.MappedToType;
            var mapToTypeName = mappedToType.Name + UnityExtensions.GetGenericArgumentsList(mappedToType);

            var registrationName = registration.Name ?? "[default]";

            var lifetime = registration.LifetimeManagerType.Name;
            if (mapToTypeName != registeredTypeName)
            {
                mapToTypeName = $" -> {mapToTypeName}";
            }
            else
            {
                mapToTypeName = string.Empty;
            }

            return $"+ {registeredTypeName}{mapToTypeName}  '{registrationName}'  {lifetime}";
        }

        private static string GetGenericArgumentsList(Type type)
        {
            // code from https://msdn.microsoft.com/en-us/library/dn178463(v=pandp.30).aspx

            if (type.GetGenericArguments().Length == 0)
            {
                return string.Empty;
            }

            var arglist = string.Empty;
            var first = true;
            foreach (Type genericArgumentType in type.GetGenericArguments())
            {
                arglist += first ? genericArgumentType.Name : $", {genericArgumentType.Name}";
                first = false;

                if (genericArgumentType.GetGenericArguments().Length > 0)
                {
                    arglist += UnityExtensions.GetGenericArgumentsList(genericArgumentType);
                }
            }
            return $"<{arglist}>";
        }

        /// <summary>
        /// Registers an implementation interface for an already registered type. The name is autogenerated and cannot be changed.
        /// </summary>
        public static void RegisterNamedFromExisting<TToRegister, TExisting>(this IUnityContainer unityContainer)
        {
            unityContainer.RegisterType<TToRegister>(
                typeof(TToRegister).Name + typeof(TExisting).Name,
                new InjectionFactory(
                    container => container.Resolve<TExisting>()));
        }

        /// <summary>
        /// Registers an implementation interface for an already registered type.
        /// </summary>
        public static void RegisterFromExisting<TToRegister, TExisting>(this IUnityContainer unityContainer)
        {
            unityContainer.RegisterType<TToRegister>(
                new InjectionFactory(
                    container => container.Resolve<TExisting>()));
        }
    }
}